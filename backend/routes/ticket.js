const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Travel = require('../models/travel');


// -------------------------------------
// CREATE TICKET
// -------------------------------------
router.post('/addTicket', async (req, res) => {
    try {
        const data = req.body;

        // Fetch and check related travel first
        const travel = await Travel.findById(data.travelId);
        if (!travel) {
            return res.status(404).send('Associated travel not found');
        }

        if (travel.seatsAvailable <= 0) {
            return res.status(400).send('No available seats');
        }

        // Create and save ticket
        const ticket = new Ticket(data);
        const savedTicket = await ticket.save();

        // Update travel seat count
        travel.seatsAvailable -= 1;
        await travel.save();

        res.status(200).send(savedTicket);
        console.log(savedTicket);
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message || 'Failed to create ticket');
    }
});


// -------------------------------------
// GET ALL TICKETS (Admin or Debug Only)
// -------------------------------------
router.get('/getAllTickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).send(tickets);
        console.log(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// -------------------------------------
// GET TICKETS BY USER (Safe POST)
// -------------------------------------


router.post('/getTicketsByUser', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send('User ID is required');
        }

        const tickets = await Ticket.find({ ownerId: userId });

        // Always return 200 with the tickets array (empty if none found)
        return res.status(200).send(tickets);

    } catch (err) {
        
    console.error(err);
    
    res.status(500).send('Server Error');
    }
});


// -------------------------------------
// GET TICKETS BY TRAVEL (Safe POST)
// -------------------------------------
router.post('/getTicketsByTravel', async (req, res) => {
    try {
        const { travelId } = req.body;

        if (!travelId) {
            return res.status(400).send('Travel ID is required');
        }

        const tickets = await Ticket.find({ travelId });
        if (!tickets || tickets.length === 0) {
            return res.status(404).send('No tickets found for this travel');
        }

        res.status(200).send(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// -------------------------------------
// GET TICKET BY ID (still using GET but could be POST if sensitive)
// -------------------------------------
router.post('/getTicketById', async (req, res) => {
    try {
        const { ticketId } = req.body;

        if (!ticketId) {
            return res.status(400).send('Ticket ID is required');
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).send('Ticket not found');
        }

        res.status(200).send(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// -------------------------------------
// CANCEL TICKET
// -------------------------------------
router.put('/cancelTicket', async (req, res) => {
    try {
        const { ticketId } = req.body;

        if (!ticketId) {
            return res.status(400).send('Ticket ID is required');
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { isCancelled: true },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).send('Ticket not found');
        }

        res.status(200).send(updatedTicket);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



module.exports = router;