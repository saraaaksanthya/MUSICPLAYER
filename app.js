const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON parsing error:', err); // Log JSON parsing errors
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
