const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@kiit.ac.in$/.test(v); 
      },
      message: props => `${props.value} is not a valid KIIT email!`
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

module.exports = FoundItem;
