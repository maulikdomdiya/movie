const movie = require('../models/moviemodel');
const show = require('../models/show');

module.exports.addshow = async (req,res) => {
    let moviedata = await movie.find(req.body);
    return res.render('addshow',{
        'csdata' : moviedata
    })
}

module.exports.insertshow = async (req,res) => {
    let showdata = await show.create(req.body);
    return res.redirect('back');
}

module.exports.viewShows = async (req,res) => {
    let showdata = await show.find(req.body).populate('showname').exec();
    console.log(showdata);
    return res.render('viewshow',{
        'showdata' : showdata
    })
}

module.exports.delete = async(req,res) =>{
    let showdata = await show.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}

module.exports.update = async (req,res) => {
    let showdata = await show.findById(req.params.id).populate('showname').exec();
    // let moviedata = await movie.findById(req.params.id);
    // console.log(moviedata);
    return res.render('showupdate',{
        'showdata' : showdata,
        // 'moviedata' : moviedata 
    });
}

