const express = require('express');
const router = express.Router();
const { tradeMicrogridEnergy } = require('../controllers/greenController');

// POST /api/green/trade
// Execute a spatially-verified energy trade
router.post('/trade', tradeMicrogridEnergy);

module.exports = router;