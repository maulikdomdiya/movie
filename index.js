const express = require('express');

const port = 8021;

const app = express();

const path = require('path');

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

mongoose.connect('mongodb+srv://maulikpatel4723:mdg.1234@cluster0.8z1c8ed.mongodb.net/test',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('DB Connect');
}).catch(err =>{
    console.log('DB Not Connected !!',err);
})

app.use(express.urlencoded());
app.use('/upload',express.static(path.join(__dirname+'/upload')));

const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./confing/passport-local-strategy');
const passportuser = require('./confing/passport-user-strategey');

app.use(express.static('assets'));

app.use(session({
    name : 'movie',
    secret : 'project',
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 60*100*1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticationuser);

app.use('/',require('./route/index'));

app.listen(port,(err)=>{
    if(err)
    {
        console.log("server is not running");
    }
    console.log("server is running",port);
})
