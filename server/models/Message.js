// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  fromUser: {
    type: String, // sender name
    required: true
  },
  toUser: {
    type: String, // recipient name
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MessageModel = mongoose.model('Message', MessageSchema);
export default MessageModel;
