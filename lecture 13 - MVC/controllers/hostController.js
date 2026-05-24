// Host Controller - Handles all host-side operations
// Manages adding, editing, deleting, and listing homes

const Home = require('../models/Home');

// GET /host/add-home - Show the Add Home form
exports.getAddHome = (req, res, next) => {
    res.render('host/addHome', {
        pageTitle: 'Add Home to Airbnb',
        currentPage: 'add-home',
        editing: false
    });
};

// POST /host/add-home - Process form submission and save new home
exports.postAddHome = (req, res, next) => {
    const { houseName, price, location, rating, photoUrl } = req.body;

    const home = new Home(houseName, price, location, rating, photoUrl);

    home.save(() => {
        res.render('host/home-added', {
            pageTitle: 'Home Registered Successfully',
            currentPage: 'home-added'
        });
    });
};

// GET /host/host-home-list - Show all homes registered by host
exports.getHostHomeList = (req, res, next) => {
    Home.fetchAll((homes) => {
        res.render('host/host-home-list', {
            pageTitle: 'Your Listings',
            currentPage: 'host-home-list',
            homes: homes
        });
    });
};

// GET /host/edit-home/:homeId - Show edit form with prepopulated data
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findById(homeId, (home) => {
        if (!home) {
            return res.redirect('/host/host-home-list');
        }
        res.render('host/edit-home', {
            pageTitle: 'Edit Home',
            currentPage: 'host-home-list',
            home: home,
            editing: true
        });
    });
};

// POST /host/edit-home - Process edit form and update home
exports.postEditHome = (req, res, next) => {
    const { homeId, houseName, price, location, rating, photoUrl } = req.body;

    const updatedHome = new Home(houseName, price, location, rating, photoUrl, homeId);

    updatedHome.save(() => {
        res.redirect('/host/host-home-list');
    });
};

// POST /host/delete-home - Delete a home listing
exports.postDeleteHome = (req, res, next) => {
    const homeId = req.body.homeId;

    Home.deleteById(homeId, () => {
        res.redirect('/host/host-home-list');
    });
};
