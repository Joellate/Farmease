const db = require('../db');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT id, name, email, user_type, phone, created_at FROM "FarmEase".users WHERE id = $1',
      [userId]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    const user = result.rows[0];
    user.userType = user.user_type;
    delete user.user_type;
    res.json(user);
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    const result = await db.query(
      `UPDATE "FarmEase".users SET name = COALESCE($1, name), phone = COALESCE($2, phone), updated_at = NOW()
       WHERE id = $3 RETURNING id, name, email, user_type, phone, updated_at`,
      [name || null, phone || null, userId]
    );

    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });
    const user = result.rows[0];
    user.userType = user.user_type;
    delete user.user_type;
    res.json(user);
  } catch (err) {
    console.error('updateProfile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
