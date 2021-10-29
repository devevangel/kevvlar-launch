const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A card must have a title']
  },
  description: {
    type: String,
    required: [true, 'A card must have a description']
  },
  checkList: {
    type: [String]
  },
  date: {
    type: String
  },
  colorLabel: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Card must belong to a board']
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: [true, 'Card must belong to a column']
  }
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
