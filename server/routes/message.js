// routes/messages.js
import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Send confession
router.post('/send', async (req, res) => {
  const { fromUser, toUser, message } = req.body;
  if (!fromUser || !toUser || !message) {
    return res.status(400).json({ message: 'All fields required' });
  }

  await Message.create({ fromUser, toUser, message });
  res.json({ message: 'Message sent anonymously' });
});

// Get messages for all users (exclude fromUser)
router.get('/all', async (req, res) => {
  const messages = await Message.find()
    .sort({ timestamp: -1 })
    .select('-fromUser'); // exclude fromUser
  res.json(messages);
});

export default router;
