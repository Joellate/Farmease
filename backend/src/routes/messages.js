const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendMessage, getConversation } = require('../controllers/messageController');

// POST /api/messages -> send a message (authenticated)
router.post('/', auth, sendMessage);

// GET /api/messages/:otherUserId -> get conversation with another user
router.get('/:otherUserId', auth, getConversation);

module.exports = router;
