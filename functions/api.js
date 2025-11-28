const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();

// 1. DATA MODEL (FIXED)
const ListingSchema = new mongoose.Schema({
  name: String,
  kwh: Number,
  price: Number,
  type: String
});

// THE FIX: Check if model exists before creating it
const Listing = mongoose.models.Listing || mongoose.model('Listing', ListingSchema);

// 2. DATABASE CONNECTION
let conn = null;
const uri = process.env.MONGO_URI;

async function connect() {
  if (conn) return conn;
  try {
    conn = await mongoose.connect(uri);
    return conn;
  } catch (e) {
    console.log("Offline mode");
    return null;
  }
}

app.use(express.json());
const router = express.Router();

router.get('/listings', async (req, res) => {
  await connect();

  // If DB is offline, return fake data
  if (!conn) {
    return res.json([
      { _id: '1', name: 'Offline Solar', kwh: 50, price: 10, type: 'SOLAR' }
    ]);
  }

  try {
    // Check if DB is empty
    let listings = await Listing.find();
    
    // IF EMPTY: Create data immediately!
    if (listings.length === 0) {
      console.log("Database empty. Seeding data...");
      await Listing.insertMany([
        { name: 'Mama Solar (Nairobi)', kwh: 120, price: 15, type: 'SOLAR' },
        { name: 'City Grid Share', kwh: 500, price: 22, type: 'GRID' },
        { name: 'Sunny Side Up', kwh: 75, price: 12, type: 'SOLAR' }
      ]);
      listings = await Listing.find();
    }
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

router.post('/listings', async (req, res) => {
  await connect();
  if (conn) await Listing.create(req.body);
  res.json({ status: "Added" });
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);