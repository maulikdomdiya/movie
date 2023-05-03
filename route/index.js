const express = require('express');

const route = express.Router();

const controller = require('../controller/index');

const movie = require('../models/moviemodel');
const userm = require('../models/userregister');

const passport = require('passport');

route.get('/', controller.front);

route.get('/dashboard', passport.checkauthentication, controller.dash);

route.get('/login',controller.login);
route.post('/addlogin', passport.authenticate('local',{failureRedirect : '/login'}), controller.addlogin);

route.get('/register',controller.register);
route.post('/addregistre',controller.addregistre);

route.get('/addmovie', passport.checkauthentication, controller.addmovie);
route.post('/insertmovie', passport.checkauthentication, movie.uploadimage,controller.insertmovie);
route.get('/viewmovie', passport.checkauthentication, controller.viewmovie);

route.get('/adminprofile/:id', passport.checkauthentication, controller.adminprofile);
route.post('/profileupdate', passport.checkauthentication, controller.profileupdate);

route.get('/deactive/:id', passport.checkauthentication, controller.deactive);
route.get('/active/:id', passport.checkauthentication, controller.active);

route.get('/changepassword', passport.checkauthentication, controller.changepassword);
route.post('/editpassword', passport.checkauthentication, controller.editpassword);

route.get('/logout', async (req,res)=> {
    req.logOut(function (err){
        if(err){
            return next(err);
        }
        return res.redirect('/login');
    })
})

route.get('/useregistre', controller.useregistre);
route.post('/adduseregistre', controller.adduseregistre);

route.get('/userlogin', controller.userlogin);
route.post('/useraddlogin', passport.authenticate('user', {failureRedirect : '/userlogin'}) ,controller.useraddlogin);

route.get('/bookticket/:id', passport.checkAuth ,controller.bookticket);

route.post('/addtocart', passport.checkAuth ,controller.addtocart);

route.get('/cart/:id', controller.cart);

route.get('/cartdelete/:id', controller.cartdelete);

route.get('/userlogout', async (req,res)=> {
    req.logOut(function (err){
        if(err){
            return next(err);
        }
        return res.redirect('/userlogin');
    })
})

route.use('/Show', require('./Show'));

module.exports = route;