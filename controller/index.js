const register = require('../models/register');
const movie = require('../models/moviemodel');
const userm = require('../models/userregister')
const show = require('../models/show');
const fs = require('fs');
const path = require('path');
const { render } = require('ejs');
const e = require('express');
const { log } = require('console');
const addcart = require('../models/addtocart');

module.exports.front = async (req,res) =>{
    let moviedata = await show.find({}).populate('showname').exec();
    // console.log(moviedata);
    return res.render('frontmain',{
        'moviedata' : moviedata
    });
}

module.exports.useregistre = async (req,res) =>{
    
        // let moviedata = await movie.find(req.body);
        return res.render('userregister',{
            // 'moviedata' : moviedata
        });
   
    
    // let moviedata = await userm.create(req.body);
    
    // let movitik = await movie.findById(req.params.id);
    // console.log(req.params.id);
}

module.exports.adduseregistre = async (req,res) => {
    // console.log(req.body);
    let admindata = await userm.findOne({uemail : req.body.uemail});
    if(admindata){
        console.log('Invalaid detials');
        return res.redirect('back');
    }
    else{
        if(req.body.upassword == req.body.ucpassword){
            let usercreatedata = await userm.create(req.body);
            return res.redirect('/userlogin');
        }
        else{
            console.log('Password Is Not Match !!');
            return res.redirect('back');
        }
    }
}

module.exports.userlogin = async (req,res) =>{
    if(req.isAuthenticated()){
        return res.redirect('/');  
    }
    return res.render('userlogin');
}

module.exports.useraddlogin = async (req,res) => {
    let moviedata = await show.find({}).populate('showname').exec();
    // console.log(moviedata);
    return res.render('frontmain',{
        'moviedata' : moviedata
    });

}

module.exports.bookticket = async (req,res) =>{
    // console.log(req.params.id);
    let userdata = await show.findById(req.params.id).populate('showname').exec();
    // console.log(userdata);
    return res.render('ticketspage',{
        'data' : userdata
    });
}

module.exports.addtocart = async (req,res) => {
    console.log(req.user);
    console.log(req.body);
    let userid = await req.user.id;
    let name = await req.body.name;
    let email = await req.user.uemail;
    let person = await req.body.person;
    let price = await req.body.price;
    let total = await req.body.total;
    let time = await req.body.time;
    let adddata = await addcart.create({
        userid : req.user.id,
        name : req.body.name,
        email : req.user.uemail,
        person : req.body.person,
        price : req.body.price,
        total : req.body.total,
        time : req.body.time
    })
    return res.redirect('/');
}

module.exports.cart = async (req,res) => {
    // console.log(locals.user);
    let userid = await req.params.id;
    let cartdata = await addcart.find({'userid' : userid});
    if(cartdata){
        // console.log(cartdata);
        return res.render('showdata',{
            showdata : cartdata
        });
    }
    else{
        return res.redirect('back');
    }
}

module.exports.cartdelete = async (req,res) => {
    // console.log(req.params.id);
    let cartdata = await addcart.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

// module.exports.userlog = async (req,res) => {
//     let moviedata = await movie.findById(req.params.id);
//     console.log(moviedata);
//     return res.render('ticketspage',{
//         'moviedata' : moviedata
//     });
// }

module.exports.dash = async (req,res) =>{
    return res.render('dashboard');
}

module.exports.register = async(req,res) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.render('register');
}

module.exports.addregistre = async (req,res) => {
    console.log(req.body);
    let admindata = await register.findOne({email : req.body.email});
    if(admindata){
        console.log('Invalaid detials');
        return res.redirect('back');
    }
    else{
        if(req.body.password == req.body.cpassword){
            let addata = await register.create({
                email : req.body.email,
                password : req.body.password
            })
            return res.redirect('/login');
        }
        else{
            console.log('Password Is Not Match !!');
            return res.redirect('back');
        }
    }
}

module.exports.login = async(req,res) =>{
    if(req.isAuthenticated()){
        return res.render('dashbored');  
    }
    return res.render('login');
}

module.exports.addlogin = async(req,res) =>{
    return res.render('dashbored');
}

module.exports.addmovie = async(req,res) =>{
    return res.render('addmovie');
}

module.exports.insertmovie = async(req,res) =>{
    req.body.isactive = 'true';
    var imagepath ='';
    if(req.file){
        var imagepath = movie.imagepath+"/"+req.file.filename;
    }  
    req.body.image = imagepath;
    let moviedata = await movie.create(req.body);
    if(moviedata){
        console.log("Data is inserted");
        return res.redirect('back');
    }
    else
    {
        console.log("record is Not insert");
    }
}

module.exports.viewmovie = async(req,res) =>{
    let active = await movie.find({'isactive' : true});
    let deactive = await movie.find({'isactive' : false});

    let search = '';
    if(req.query.search){
        search = req.query.search;
    }

    let page = 1;
    if(req.query.page){
        page = req.query.page
    }
    // console.log(req.query.page);
    var p_page = 1;

    let admindata = await movie.find({
        $or : [
            {name : {$regex : '.*'+search+'.*'}},
        ]
    })
    .skip((page -1)*p_page)
    .limit(p_page)
    .exec();

    let countdata = await movie.find({
        $or : [
            {name : {$regex : '.*'+search+'.*'}},
            // {email : {$regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    
    // let moviedata = await movie.find(req.body);
    return res.render('viewmovie',{
        'admindata' : admindata,
        'activedata': active,
        'deacticedata' : deactive,
        'countdata' : Math.floor(countdata/p_page),
        'searchdata' : search
    });
}

module.exports.deactive = async (req,res) => {
    let moviedata = await movie.findByIdAndUpdate(req.params.id,{
        isactive : 'false'
    })
    return res.redirect('back');
}

module.exports.active = async (req,res) => {
    let moviedata = await movie.findByIdAndUpdate(req.params.id,{
        isactive : 'true'
    })
    return res.redirect('back');
}

module.exports.adminprofile = async (req,res) => {
    let moviedata = await movie.findById(req.params.id);
    return res.render('viewprofile',{
        moviedata : moviedata
    });
}

module.exports.profileupdate = async (req,res) => {
    let moviedata = await movie.findById(req.body.editmovie);
    if(moviedata){
            var movieupdate = await movie.findByIdAndUpdate(req.body.editmovie, req.body);
                if(movieupdate){
                    return res.redirect('/viewmovie');
                }
                return res.redirect('back');
            
        // if(moviedata.image){
        //     fs.unlinkSync(path.join(__dirname,'..',moviedata.image));
        // }
        //     var imgPath = movie.imagepath+"/"+req.file.filename;
        //     name : req.body.name,
        //     price : req.body.price,
        //     detail : req.body.detail,
        //     image : imgPath
        // });
    }
    return res.redirect('back');
}

module.exports.changepassword = async(req,res) =>{
    return res.render('changepassword');   
}

module.exports.editpassword = async (req,res) => {
    // console.log(req.body);
    var oldpass = req.user.password;
    var opass = req.body.opass;
    var npass = req.body.npass;
    var copass = req.body.copass;
    if(oldpass == opass){
        if(opass != npass){
            if(npass == copass){
                let moviedata = await register.findByIdAndUpdate(req.user.id, {password : npass});
                return res.redirect('/logout');
            }
            else{
                console.log("New & Confirm Are Not Match !!");
                return res.redirect('back');
            }
        }
        else{
            console.log("Old Password & New Are Match !!");
            return res.redirect('back');
        }
    }
    else{
        console.log("Old Password Not Match !!");
        return res.redirect('back');
    }
}