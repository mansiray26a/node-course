//core Modules
const path = require('path');


//external modules
const express = require('express');
const userRouter = express.Router();


//local Module
const rootDir = require("../utils/pathUtil");
const hostRouter = require("./hostRouter");



userRouter.get("/" ,(req,res,next) => {
    res.render('home', {
        pageTitle: 'Airbnb Home',
        homes: hostRouter.registeredHomes,
        currentPage: 'home'
    });
});


module.exports = userRouter;