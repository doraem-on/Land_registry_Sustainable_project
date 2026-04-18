const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'lalit', // Using your Mac username from the terminal logs
  host: 'localhost',
  database: 'gdlr',
  password: process.env.DB_PASSWORD || '',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect() 
};