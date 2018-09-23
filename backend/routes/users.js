const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  let newUser = new User ({
    //_id:req.body.username,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  console.log(newUser);

  User.addUser(newUser, (err, user) => {
    if(err) {
      console.log({success: false, msg: 'Failed to register user'});
      res.json({success: false, msg: 'Failed to register user'});
      //res.json({success: false, msg: 'Failed to register user'});
    } else {
            console.log({success: true, msg: 'registered in User and Alluser Collection'});
            res.json({success: true, msg: 'registered in User and Alluser Collection'});
          }
        });
  });

//GET All Users
router.get('/getallusers', (req, res, next) => {
  User.find({},function(err,userdata){
    if(err)
    {
      console.log(err);
    }
    else{
    console.log(userdata);
    res.json(userdata);
  }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'Bearer '+token,
          user: 
          {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});
// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
