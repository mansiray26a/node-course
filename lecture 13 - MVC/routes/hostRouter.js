// Host Router - Routes for host operations (add, edit, delete homes)

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module - Host Controller
const hostController = require('../controllers/hostController');

// GET /host/add-home - Show add home form
hostRouter.get('/add-home', hostController.getAddHome);

// POST /host/add-home - Submit new home
hostRouter.post('/add-home', hostController.postAddHome);

// GET /host/host-home-list - Show all host's homes
hostRouter.get('/host-home-list', hostController.getHostHomeList);

// GET /host/edit-home/:homeId - Show edit form
hostRouter.get('/edit-home/:homeId', hostController.getEditHome);

// POST /host/edit-home - Submit edited home
hostRouter.post('/edit-home', hostController.postEditHome);

// POST /host/delete-home - Delete a home
hostRouter.post('/delete-home', hostController.postDeleteHome);

module.exports = hostRouter;