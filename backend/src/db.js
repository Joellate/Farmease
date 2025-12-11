// backend/src/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'false'
      ? false
      : { rejectUnauthorized: false }, // required for Supabase in local dev
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
