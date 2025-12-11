const db = require('../db');

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiver_id, crop_id, content } = req.body;

    if (!receiver_id || !content) {
      return res.status(400).json({ error: 'Missing receiver_id or content' });
    }

    const result = await db.query(
      `INSERT INTO messages (sender_id, receiver_id, crop_id, content)
       VALUES ($1, $2, $3, $4)
       RETURNING id, sender_id, receiver_id, crop_id, content, created_at`,
      [senderId, receiver_id, crop_id || null, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('sendMessage error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;

    const result = await db.query(
      `SELECT id, sender_id, receiver_id, crop_id, content, created_at FROM messages
       WHERE (sender_id = $1 AND receiver_id = $2)
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [userId, otherUserId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('getConversation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
