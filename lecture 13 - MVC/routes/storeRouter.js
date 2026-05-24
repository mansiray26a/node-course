// Store Router - Routes for user/store operations (browse, book, wishlist)

// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module - Store Controller
const storeController = require('../controllers/storeController');

// GET / - Landing page
storeRouter.get('/', storeController.getIndex);

// GET /homes - Browse all homes
storeRouter.get('/homes', storeController.getHomeList);

// GET /homes/:homeId - View single home detail
storeRouter.get('/homes/:homeId', storeController.getHomeDetail);

// GET /bookings - Show user's bookings
storeRouter.get('/bookings', storeController.getBookings);

// POST /bookings - Create a booking
storeRouter.post('/bookings', storeController.postAddBooking);

// POST /bookings/delete - Cancel a booking
storeRouter.post('/bookings/delete', storeController.postDeleteBooking);

// GET /favourites - Show wishlist
storeRouter.get('/favourites', storeController.getFavouriteList);

// POST /favourites - Add to wishlist
storeRouter.post('/favourites', storeController.postAddFavourite);

// POST /favourites/remove - Remove from wishlist
storeRouter.post('/favourites/remove', storeController.postRemoveFavourite);

module.exports = storeRouter;
