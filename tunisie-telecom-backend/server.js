require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/stations', require('./routes/baseStationRoutes'));
app.use('/api/v1/transmissions', require('./routes/transmissionRoutes'));
app.use('/api/v1/antennes', require('./routes/antenneRoutes'));
app.use('/api/v1/derangements', require('./routes/derangementRoutes'));

// Error handling middleware
app.use(errorHandler);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('stationUpdate', (data) => {
    io.emit('refreshStations', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));