const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Board must belong to a user.'],
    select: false
  },
  title: {
    type: String,
    required: [true, 'Board must contain a title']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
