const passport = require('passport');
const userm = require('../models/userregister');
const passportlocal = require('passport-local').Strategy;
const e = require('express');


console.log('passport is running');

passport.use('user', new passportlocal({
    usernameField : 'email'
}, async (uemail,password,done)=> {
    let userdata = await userm.findOne({uemail : uemail});
    if(userdata){
        return done(null,userdata);
    }
    else{
        console.log('invalid details !!');
        return done(null,false);
    }
}))

passport.checkAuth = async (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/userlogin');
}

module.exports = passport;