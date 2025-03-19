const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const User = require('./models/User'); // Import User model
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);

// Route to fetch users from the database
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().exec();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('JSON parsing error:', err);
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://192.168.1.13/musicApp', { // Updated MongoDB connection string
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
