const express = require('express');
const router = express.Router();
const { tradeWaterQuota } = require('../controllers/waterController');

// POST /api/water/trade
// Execute a high-concurrency water quota trade
router.post('/trade', tradeWaterQuota);

module.exports = router;