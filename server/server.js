const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const lostItemRoutes = require('./routes/server'); // Import the router

require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  credentials: true, // Include this if your frontend sends cookies or requires credentials
}));

const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected!'))
.catch(err => console.error('Database connection error:', err));

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
