const mongoose = require('mongoose');

const showschema = mongoose.Schema({
    showname : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie',
        required : true
    },
    time : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})

const show = mongoose.model('show', showschema);
module.exports = show;