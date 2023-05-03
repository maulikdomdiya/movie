const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    uemail : {
        type : String,
        required : true
    },
    upassword : {
        type : String,
        required : true
    }
})

const userm = mongoose.model('userm', userschema);
module.exports = userm;