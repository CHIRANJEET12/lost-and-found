const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location: { type: String, required: true },
    coordinates: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
});

locationSchema.index({ coordinates: '2dsphere' }); // For geo queries

const Location = mongoose.model('Location', locationSchema);
module.exports = Location; // Ensure this line is correct
