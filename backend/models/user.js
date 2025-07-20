const mongoose = require('mongoose');



const User = mongoose.model('User', {
    // name: {
    //     type: String,
    // },
    //after testing make data struc like this: 
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    dateOfBirth: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String,
    },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        postalCode: { type: String, default: '' },
        country: { type: String, default: '' },
    },
});







module.exports = User;


