import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: 5000
  },
  ip: {
    type: String,
    default: '127.0.0.1'
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
