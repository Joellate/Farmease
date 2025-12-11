// backend/src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, userType, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = await db.query('SELECT id FROM "FarmEase".users WHERE email = $1', [email]);
    if (existing.rows.length) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO "FarmEase".users (name, email, password_hash, user_type, phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, user_type, phone, created_at`,
      [name, email, passwordHash, userType || 'buyer', phone || null]
    );

    const user = result.rows[0];
    // normalize field names for frontend (camelCase)
    user.userType = user.user_type;
    delete user.user_type;
    // keep phone in response if present
    const token = signToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('signup error:', err);
    res.status(500).json({ error: 'Failed to sign up.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const result = await db.query(
      'SELECT id, name, email, user_type, password_hash FROM "FarmEase".users WHERE email = $1',
      [email]
    );

    if (!result.rows.length) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    console.log('authController.login - fetched user row:', user);
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken(user);
    // normalize and remove sensitive fields
    user.userType = user.user_type;
    delete user.user_type;
    delete user.password_hash;

    res.json({ user, token });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ error: 'Failed to log in.' });
  }
};
