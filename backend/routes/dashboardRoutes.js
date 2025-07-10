const express = require('express');
const {
  getDashboardStats
} = require('../controllers/dashboardController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/overview', authenticate, getDashboardStats);
// router.get('/recent-disruptions', protect, getRecentDisruptions);
// router.get('/station-status', protect, getStationStatus);

module.exports = router;