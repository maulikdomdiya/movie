const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/movie');
        
const db = mongoose.connection;

db.once('open', (err)=>{
    if(err)
    {
        console.log("db is not connect");
    }
    console.log("db is connect");
})

module.exports = db;