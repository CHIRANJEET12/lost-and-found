const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const lostItemRoutes = require('./routes/server'); // Import the router


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  credentials: true, // Include this if your frontend sends cookies or requires credentials
}));

// Use the MongoDB URI from the .env file
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("connected to MongoDB Atlas");
})
.catch(err => {
  console.error("Failed to connect to MongoDB Atlas", err);
});

// Use the lostItems routes with a prefix
app.use(lostItemRoutes); // Prefixing with /api

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
