const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
// const landRoutes = require('./routes/landRoutes');
const greenRoutes = require('./routes/greenRoutes');
const txRoutes = require('./routes/txRoutes');
const waterRoutes = require('./routes/waterRoutes');

// Mount Routes (We will uncomment the others as we build them)
// app.use('/api/land', landRoutes);
app.use('/api/green', greenRoutes);
app.use('/api/tx', txRoutes);
app.use('/api/water', waterRoutes);
app.use(express.static('public'));

// Health Check
app.get('/', (req, res) => {
    res.json({ message: "Green Digital Land Registry (GDLR) Engine Running." });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`GDLR Core Engine engaged on port ${PORT}`);
});