// Store Controller - Handles all user/store-side operations
// Manages browsing homes, viewing details, bookings, and favourites

const Home = require('../models/Home');
const Booking = require('../models/Booking');
const Favourite = require('../models/Favourite');

// GET / - Landing page (index)
exports.getIndex = (req, res, next) => {
    Home.fetchAll((homes) => {
        res.render('store/index', {
            pageTitle: 'Airbnb Home',
            currentPage: 'home',
            homes: homes
        });
    });
};

// GET /homes - Browse all homes list
exports.getHomeList = (req, res, next) => {
    Home.fetchAll((homes) => {
        Favourite.fetchAll((favouriteIds) => {
            res.render('store/home-list', {
                pageTitle: 'Browse Homes',
                currentPage: 'home-list',
                homes: homes,
                favouriteIds: favouriteIds
            });
        });
    });
};

// GET /homes/:homeId - View single home detail
exports.getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId;

    Home.findById(homeId, (home) => {
        if (!home) {
            return res.status(404).render('404', {
                pageTitle: 'Home Not Found',
                currentPage: ''
            });
        }
        Favourite.isFavourite(homeId, (isFav) => {
            res.render('store/home-detail', {
                pageTitle: home.name,
                currentPage: 'home-list',
                home: home,
                isFavourite: isFav
            });
        });
    });
};

// GET /bookings - Show user's bookings
exports.getBookings = (req, res, next) => {
    Booking.fetchAll((bookings) => {
        res.render('store/bookings', {
            pageTitle: 'My Bookings',
            currentPage: 'bookings',
            bookings: bookings
        });
    });
};

// POST /bookings - Create a new booking
exports.postAddBooking = (req, res, next) => {
    const { homeId, checkIn, checkOut } = req.body;

    Home.findById(homeId, (home) => {
        if (!home) {
            return res.redirect('/homes');
        }

        const booking = new Booking(
            home.id,
            home.name,
            home.photoUrl,
            home.location,
            home.price,
            checkIn,
            checkOut
        );

        booking.save(() => {
            res.render('store/reserve', {
                pageTitle: 'Booking Confirmed',
                currentPage: 'bookings',
                booking: booking,
                home: home
            });
        });
    });
};

// POST /bookings/delete - Cancel a booking
exports.postDeleteBooking = (req, res, next) => {
    const bookingId = req.body.bookingId;

    Booking.deleteById(bookingId, () => {
        res.redirect('/bookings');
    });
};

// GET /favourites - Show user's wishlist
exports.getFavouriteList = (req, res, next) => {
    Favourite.fetchAll((favouriteIds) => {
        Home.fetchAll((allHomes) => {
            // Filter homes that are in the favourites list
            const favouriteHomes = allHomes.filter(home => favouriteIds.includes(home.id));

            res.render('store/favourite-list', {
                pageTitle: 'My Wishlist',
                currentPage: 'favourites',
                homes: favouriteHomes
            });
        });
    });
};

// POST /favourites - Add home to wishlist
exports.postAddFavourite = (req, res, next) => {
    const homeId = req.body.homeId;

    Favourite.addToFavourites(homeId, () => {
        res.redirect('/homes/' + homeId);
    });
};

// POST /favourites/remove - Remove home from wishlist
exports.postRemoveFavourite = (req, res, next) => {
    const homeId = req.body.homeId;

    Favourite.removeFromFavourites(homeId, () => {
        // Redirect back to wherever the user came from
        const redirectTo = req.body.redirectTo || '/favourites';
        res.redirect(redirectTo);
    });
};
