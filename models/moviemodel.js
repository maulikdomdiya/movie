const mongosse = require('mongoose');

const path = require('path');

const multer = require("multer");

const imagepath = "/upload/movie";

const movieschema = mongosse.Schema ({
    name :{
        type : String ,
        require : true
    },
    price :{
        type : String ,
        require : true
    },
    detail :{
        type : String ,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    isactive : {
        type : Boolean
    }
}) 

const storage = multer.diskStorage({
    destination :function (req,file,cb){
        cb(null,path.join(__dirname,'..',imagepath));
    },
    filename : function(req,file,cb)
    {
        cb(null,file.fieldname +"-"+ Date.now());
    }
})

movieschema.statics.uploadimage = multer({storage : storage}).single('image');
movieschema.statics.imagepath = imagepath;

const movie = mongosse.model('movie',movieschema);
module.exports = movie;