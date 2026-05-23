//core module
const path = require('path');


//external module
const express = require('express');
const hostRouter = express.Router();



//local Module
const rootDir = require("../utils/pathUtil");

hostRouter.registeredHomes = [];


hostRouter.get("/add-home", (req, res, next) => {
    res.render('addHome', { pageTitle: 'Add Home to Airbnb', currentPage: 'add-home' });
})

hostRouter.post("/add-home", (req, res, next) => {
    const { houseName, price, location, rating, photoUrl } = req.body;
    if (houseName) {
        hostRouter.registeredHomes.push({
            name: houseName,
            price: price || '0',
            location: location || 'Secret Location',
            rating: rating || '5',
            photoUrl: photoUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
        });
    }
    console.log(req.body);
    res.render('homeAdded', { pageTitle: 'Home Registered Successfully', currentPage: 'home-added' });
});



module.exports = hostRouter;