const express = require('express');
const router = express.Router();
const { transferProperty } = require('../controllers/txController');

// POST /api/tx/transfer
// Execute an ACID-compliant land transfer
router.post('/transfer', transferProperty);

module.exports = router;