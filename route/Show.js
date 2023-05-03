const express = require('express');

const route = express.Router();

const controller = require('../controller/show');

const passport = require('passport');

const show = require('../models/show');

route.get('/addShows', passport.checkAuth, controller.addshow);

route.post('/insertshow', passport.checkAuth, controller.insertshow);

route.get('/viewShows', passport.checkAuth, controller.viewShows);

route.get('/delete/:id', passport.checkAuth, controller.delete);
route.get('/update/:id', passport.checkAuth, controller.update);

module.exports = route;