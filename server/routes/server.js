const express = require("express");
const LostItem = require("../models/server"); // LostItem model
const Location = require("../models/server1"); // Location model (if needed separately)
const FoundItem = require("../models/server2"); // FoundItem model
const Found = require("../models/server3"); // Found match model
const router = express.Router();

// Route to submit a lost item
router.post('/api/lost-items', async (req, res) => {
    const { itemType, itemDescription, location } = req.body; // Include location in the request body
    try {
        const newItem = new LostItem({ itemType, itemDescription, location }); // Add location
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error saving lost item:', error);
        res.status(500).json({ error: 'Failed to submit lost item. Please try again.' });
    }
});

// Route to submit a location (optional, can be integrated into the lost item route)
router.post('/api/location', async (req, res) => {
    console.log("Incoming request body:", req.body); // Log the entire request body
    const { location, coordinates } = req.body; 
    try {
        const newLocation = new Location({ location, coordinates });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error('Error saving location:', error);
        res.status(500).json({ error: 'Failed to save the location. Please try again.' });
    }
});

// Route to submit a found item
router.post('/api/found', async (req, res) => {
    const { itemName, description, location, contactInfo, email } = req.body;

    try {
        const newItem = new FoundItem({
            itemName,
            description,
            location,
            contactInfo,
            email
        });

        await newItem.save();
        res.status(201).json({ message: 'Item saved successfully', item: newItem });
    } catch (error) {
        console.error('Error saving found item:', error);
        res.status(500).json({ message: 'Failed to save item', error: error.message });
    }
});

// Route to submit a found item match
router.post('/api/match', async (req, res) => {
    const { email, location, itemId } = req.body;
  
    try {
        const foundMatch = new Found({ email, location, itemId });
        await foundMatch.save();
        res.status(201).json({ message: 'Found item submitted successfully!' });
    } catch (err) {
        console.error('Error saving found match:', err);
        res.status(500).json({ message: 'Failed to save found item', error: err.message });
    }
});

router.get('/api/match',async(req,res)=>{
    try{
        const match = await Found.find();
        res.status(200).json(match);
    } catch (error) {
        console.error('Error fetching matched items:', error);
        res.status(500).json({ error: ' Please try again.' });
    }
})

// Route to fetch all lost items
router.get('/api/lost-items', async (req, res) => {
    try {
        const items = await LostItem.find();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching lost items:', error);
        res.status(500).json({ error: 'Failed to fetch lost items. Please try again.' });
    }
});

// Route to fetch all locations (if still needed)
router.get('/api/location', async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Failed to fetch locations. Please try again.' });
    }
});

// Route to fetch all found items
router.get('/api/found', async (req, res) => {
    try {
        const foundItems = await FoundItem.find();
        res.status(200).json(foundItems);
    } catch (error) {
        console.error('Error fetching found items:', error);
        res.status(500).json({ error: 'Failed to fetch found items. Please try again.' });
    }
});

module.exports = router;
