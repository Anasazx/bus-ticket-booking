const mongoose = require('mongoose');



const Travel = mongoose.model('Travel', {

        date: {
            type: Date 
        },
        departure: {
            type: String
        },
        destination: {
            type: String
        },
        departureTime: {
            type: String
        },
        price: {
            type: Number 
        },
        seatsAvailable: {
            type: Number 
        },
        busType: {
            type: String 
        },
        numberOfSeats: {
            type: Number 
        },
        amenities: {
            type: [String] 
        },
        description: {
            type: String
        }
        
})




module.exports = Travel;


