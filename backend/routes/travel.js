const express = require('express');
const router = express.Router();
const Travel = require('../models/travel');

// Create a new travel
router.post('/addTravel', async (req, res) => {
  try {
    const data = req.body;
    const travel = new Travel(data);
    const savedTravel = await travel.save();
    res.status(200).send(savedTravel);
    console.log(savedTravel);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message || 'Failed to create travel' });
  }
});

// Get travel by ID (GET)
router.get('/getTravelById/:id', async (req, res) => {
  try {
    const travel = await Travel.findById(req.params.id);
    if (!travel) {
      return res.status(404).send({ message: 'Travel not found' });
    }
    res.status(200).send(travel);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Get all travels
router.get('/getAll', async (req, res) => {
  try {
    const travels = await Travel.find();
    res.status(200).send(travels);
    console.log(travels);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Get travels by departure and destination (POST)
router.post('/getTravelByRoute', async (req, res) => {
  try {
    const { departure, destination } = req.body;

    if (!departure || !destination) {
      return res.status(400).send({ message: 'Departure and destination are required' });
    }

    const travels = await Travel.find({
      departure: departure,
      destination: destination
    });

    res.status(200).send(travels);
    console.log(travels);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Update seats available
router.put('/updateTravelSeats', async (req, res) => {
  try {
    const { id, numberOfPurchasedSeats } = req.body;

    if (!id || numberOfPurchasedSeats == null) {
      return res.status(400).send({ message: 'Travel ID and numberOfPurchasedSeats are required' });
    }

    const travel = await Travel.findById(id);
    if (!travel) {
      return res.status(404).send({ message: 'Travel not found' });
    }

    const seatsToRemove = parseInt(numberOfPurchasedSeats, 10);
    if (isNaN(seatsToRemove) || seatsToRemove < 0) {
      return res.status(400).send({ message: 'Invalid number of purchased seats' });
    }
    if (travel.seatsAvailable < seatsToRemove) {
      return res.status(400).send({ message: 'Not enough seats available' });
    }

    travel.seatsAvailable -= seatsToRemove;
    await travel.save();

    res.status(200).send(travel);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server Error' });
  }
});

module.exports = router;