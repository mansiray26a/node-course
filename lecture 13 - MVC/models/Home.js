// Home Model - Handles all home/listing data persistence
// Uses file-based JSON storage for simplicity

const fs = require('fs');
const path = require('path');

// Path to the JSON data file
const dataFilePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'homes.json'
);

class Home {
    constructor(name, price, location, rating, photoUrl, id) {
        this.name = name;
        this.price = price || '0';
        this.location = location || 'Unknown Location';
        this.rating = rating || '5';
        this.photoUrl = photoUrl || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
        // If id is provided (editing), use it; otherwise generate a new one
        this.id = id || Date.now().toString();
    }

    // Save this home instance to the JSON file
    // If a home with the same id exists, it updates; otherwise it adds new
    save(callback) {
        Home.fetchAll((homes) => {
            const existingIndex = homes.findIndex(h => h.id === this.id);

            if (existingIndex >= 0) {
                // Update existing home
                homes[existingIndex] = this;
            } else {
                // Add new home
                homes.push(this);
            }

            fs.writeFile(dataFilePath, JSON.stringify(homes, null, 2), (err) => {
                if (err) {
                    console.error('Error saving home:', err);
                }
                if (callback) callback();
            });
        });
    }

    // Fetch all homes from the JSON file
    static fetchAll(callback) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            if (err) {
                // If file doesn't exist or is empty, return empty array
                return callback([]);
            }
            try {
                const homes = JSON.parse(fileContent);
                callback(homes);
            } catch (parseErr) {
                callback([]);
            }
        });
    }

    // Find a single home by its ID
    static findById(id, callback) {
        Home.fetchAll((homes) => {
            const home = homes.find(h => h.id === id);
            callback(home || null);
        });
    }

    // Delete a home by its ID
    static deleteById(id, callback) {
        Home.fetchAll((homes) => {
            const updatedHomes = homes.filter(h => h.id !== id);
            fs.writeFile(dataFilePath, JSON.stringify(updatedHomes, null, 2), (err) => {
                if (err) {
                    console.error('Error deleting home:', err);
                }
                if (callback) callback();
            });
        });
    }
}

module.exports = Home;
