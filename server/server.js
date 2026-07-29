const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/buses');
const cabRoutes = require('./routes/cabs');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');
const settingsRoutes = require('./routes/settings');
const blogRoutes = require('./routes/blogs');
const galleryRoutes = require('./routes/gallery');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/cabs', cabRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Pooja Tours and Travel API is running.' });
});

// Root route response
app.get('/', (req, res) => {
  res.send('Pooja Tours and Travel API Server is operational.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
