const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received data:', req.body); // Log the received data to verify
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    });

    await user.save();
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: 3600 });

    res.json({ token });
  } catch (err) {
    console.error('Error during registration:', err); // Log any errors
    res.status(500).send('Server error');
  }
});



// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request data:', req.body); // Log the login request data

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: 3600 });
    console.log('Login successful:', user); // Log successful login
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err); // Log any errors
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
