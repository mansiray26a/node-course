const Favourite = require("../models/favourite");
const Home = require("../models/home");
const Booking = require("../models/booking");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  Booking.getBookings(bookings => {
    Home.fetchAll((registeredHomes) => {
      const bookedHomes = registeredHomes.filter(home => bookings.includes(home.id));
      res.render("store/bookings", {
        bookedHomes: bookedHomes,
        pageTitle: "My Bookings",
        currentPage: "bookings",
      });
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })

};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites");
  })
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  })
};

exports.postAddToBooking = (req, res, next) => {
  const homeId = req.body.homeId;
  Booking.addToBooking(homeId, error => {
    if (error) {
      console.log("Error while booking: ", error);
    }
    res.redirect("/bookings");
  });
};

exports.postCancelBooking = (req, res, next) => {
  const homeId = req.params.homeId;
  Booking.deleteById(homeId, error => {
    if (error) {
      console.log('Error while cancelling booking', error);
    }
    res.redirect("/bookings");
  });
};

