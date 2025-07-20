const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create account
router.post('/register', async (req, res) => {
  try {
    const data = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = new User({
      ...data,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    // Exclude password in response
    const userToReturn = savedUser.toObject();
    delete userToReturn.password;

    res.status(200).json(userToReturn);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: 'Email or password invalid!' });
    }

    const validPass = await bcrypt.compare(data.password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: 'Email or password invalid!' });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    };

    const token = jwt.sign(payload, '1234567', { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: payload
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

// Get all users
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Get by id
router.get('/getById/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to fetch user', error: error.message });
  }
});

// Update
router.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (data.password) {
      // Re-hash password if updated
      const salt = bcrypt.genSaltSync(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      data,
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId).select('-password');
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `User ${deletedUser.name} successfully deleted!` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;