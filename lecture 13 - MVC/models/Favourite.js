// Favourite Model - Handles wishlist/favourite homes persistence
// Stores an array of home IDs that the user has wishlisted

const fs = require('fs');
const path = require('path');

// Path to the JSON data file
const dataFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'favourites.json'
);

class Favourite {
    // Add a home ID to the favourites list
    static addToFavourites(homeId, callback) {
        Favourite.fetchAll((favouriteIds) => {
            // Avoid duplicates
            if (!favouriteIds.includes(homeId)) {
                favouriteIds.push(homeId);
            }

            fs.writeFile(dataFilePath, JSON.stringify(favouriteIds, null, 2), (err) => {
                if (err) {
                    console.error('Error adding to favourites:', err);
                }
                if (callback) callback();
            });
        });
    }

    // Remove a home ID from the favourites list
    static removeFromFavourites(homeId, callback) {
        Favourite.fetchAll((favouriteIds) => {
            const updatedFavourites = favouriteIds.filter(id => id !== homeId);

            fs.writeFile(dataFilePath, JSON.stringify(updatedFavourites, null, 2), (err) => {
                if (err) {
                    console.error('Error removing from favourites:', err);
                }
                if (callback) callback();
            });
        });
    }

    // Fetch all favourite home IDs
    static fetchAll(callback) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if (err) {
                return callback([]);
            }
            try {
                const favouriteIds = JSON.parse(fileContent);
                callback(favouriteIds);
            } catch (parseErr) {
                callback([]);
            }
        });
    }

    // Check if a specific home ID is in favourites
    static isFavourite(homeId, callback) {
        Favourite.fetchAll((favouriteIds) => {
            callback(favouriteIds.includes(homeId));
        });
    }
}

module.exports = Favourite;
