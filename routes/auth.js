const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received data:', req.body);

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: 3600 });

        res.json({ token });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request data:', req.body); // Log the login request data

  try {
      console.log('Finding user...'); // Debug log
      let user = await User.findOne({ email });
      if (!user) {
          console.log('User not found'); // Debug log
          return res.status(400).json({ msg: 'Invalid credentials' });
      }
      console.log('User found:', user);

      console.log('Comparing passwords...');
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
          console.log('Password does not match'); // Debug log
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
