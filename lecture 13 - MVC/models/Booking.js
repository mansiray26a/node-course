// Booking Model - Handles booking/reservation data persistence
// Each booking links a home ID with check-in/check-out dates

const fs = require('fs');
const path = require('path');

// Path to the JSON data file
const dataFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'bookings.json'
);

class Booking {
    constructor(homeId, homeName, homePhoto, homeLocation, homePrice, checkIn, checkOut) {
        this.id = Date.now().toString();
        this.homeId = homeId;
        this.homeName = homeName;
        this.homePhoto = homePhoto;
        this.homeLocation = homeLocation;
        this.homePrice = homePrice;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.bookedAt = new Date().toISOString();
    }

    // Save this booking to the JSON file
    save(callback) {
        Booking.fetchAll((bookings) => {
            bookings.push(this);

            fs.writeFile(dataFilePath, JSON.stringify(bookings, null, 2), (err) => {
                if (err) {
                    console.error('Error saving booking:', err);
                }
                if (callback) callback();
            });
        });
    }

    // Fetch all bookings
    static fetchAll(callback) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if (err) {
                return callback([]);
            }
            try {
                const bookings = JSON.parse(fileContent);
                callback(bookings);
            } catch (parseErr) {
                callback([]);
            }
        });
    }

    // Find a single booking by ID
    static findById(id, callback) {
        Booking.fetchAll((bookings) => {
            const booking = bookings.find(b => b.id === id);
            callback(booking || null);
        });
    }

    // Delete/Cancel a booking by ID
    static deleteById(id, callback) {
        Booking.fetchAll((bookings) => {
            const updatedBookings = bookings.filter(b => b.id !== id);

            fs.writeFile(dataFilePath, JSON.stringify(updatedBookings, null, 2), (err) => {
                if (err) {
                    console.error('Error deleting booking:', err);
                }
                if (callback) callback();
            });
        });
    }
}

module.exports = Booking;
