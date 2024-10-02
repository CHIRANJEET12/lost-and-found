const mongoose = require('mongoose');

// Define the schema for a found item
const foundItemSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'LostItem', 
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the document is created
  },
});

// Create the model from the schema
const Found = mongoose.model('FoundItem1', foundItemSchema);

module.exports = Found;
