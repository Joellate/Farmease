const db = require('../db');


exports.getAllCrops = async (req, res) => {
  try {
    const result = await db.query(
       `SELECT 
           c.id,
         c.user_id AS farmer_id,
           c.title,
           c.description,
           c.quantity,
           c.location,
           c.price,
           c.created_at,
           u.name  AS farmer_name,
           u.email AS farmer_email,
           u.phone AS farmer_phone
         FROM crops c
         JOIN "FarmEase".users u ON c.user_id = u.id
         ORDER BY c.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getAllCrops error:', err);
    res.status(500).json({ error: 'Failed to load crops.' });
  }
};


exports.getMyCrops = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT
         c.id,
         c.title,
         c.description,
         c.quantity,
         c.location,
         c.price,
         c.created_at
       FROM crops c
       WHERE c.user_id = $1
       ORDER BY c.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getMyCrops error:', err);
    res.status(500).json({ error: 'Failed to load your crops.' });
  }
};

exports.createCrop = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, quantity, location, price } = req.body;

    console.log('createCrop called by user:', userId, 'payload:', req.body);

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const normalizedPrice =
      price === null || price === undefined || price === ''
        ? null
        : Number(price);

    if (normalizedPrice !== null && Number.isNaN(normalizedPrice)) {
      return res.status(400).json({ error: 'Price must be a number.' });
    }

    const result = await db.query(
      `INSERT INTO crops (user_id, title, description, quantity, location, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, user_id, title, description, quantity, location, price, created_at`,
      [userId, title, description || null, quantity || null, location || null, normalizedPrice]
    );

    const crop = result.rows[0];

    const userResult = await db.query(
      'SELECT name, email, phone FROM "FarmEase".users WHERE id = $1',
      [userId]
    );
    console.log('createCrop - farmer row:', userResult.rows[0]);
    const farmer = userResult.rows[0];

    res.status(201).json({
      ...crop,
      farmer_name: farmer?.name,
      farmer_email: farmer?.email,
      farmer_phone: farmer?.phone,
    });
  } catch (err) {
    console.error('createCrop error:', err);
    res.status(500).json({ error: 'Failed to save crop.' });
  }
};
