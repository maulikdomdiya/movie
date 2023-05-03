const mongoose = require('mongoose');

const addtocartschema = mongoose.Schema({
    userid : {
        ref : 'userm',
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    person : {
        type : String,
        required : true
    },
    total : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    }
})

const addcart = mongoose.model('addcart', addtocartschema);
module.exports = addcart;