const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  travelId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  nameOnTicket: {
    type: String,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;