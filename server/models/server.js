const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
    itemType: { type: String, required: true },
    itemDescription: { type: String, required: true },
    dateReported: { type: Date, default: Date.now },
    location: { type: String, required: true } // New location field
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;
