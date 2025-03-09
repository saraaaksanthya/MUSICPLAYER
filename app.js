const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS middleware
const authRoutes = require('./routes/auth');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/musicApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware
app.use('/api/auth', authRoutes);

app.use(cors({ origin: 'http://localhost:3001' })); // Allow requests from the frontend URL

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
