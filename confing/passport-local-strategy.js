const passport = require('passport');
const register = require('../models/register');
const userm = require('../models/userregister');
const passportlocal = require('passport-local').Strategy;

const e = require('express');

console.log('passport ia running');

passport.use('local', new passportlocal({
    usernameField : 'email'
}, async (email,password,done)=> {
    let moviedata = await register.findOne({email : email});
    if(moviedata && moviedata.password == password){
        return done(null,moviedata);
    }
    else{
        console.log('invalid details !!');
        return done(null,false);
    }
}))

passport.serializeUser(async (user,done)=> {
    // console.log(user);
    return done(null,user.id);
})

passport.deserializeUser(async (id,done) => {
    // console.log(req.user);
    let moviedata = await register.findById(id);
    if(!moviedata){
        let Userdata = await userm.findById(id);
        return done(null,Userdata);
    }
    else{
        console.log('data match');
        return done(null,moviedata);
    }
})

passport.checkauthentication = (req,res,next) => {
    console.log(req.user);
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}

passport.setAuthenticationuser = (req,res,next) => {
    // console.log(req.user);
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;