const mongoose = require('mongoose');

const columnOrderSchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: [true, 'Column order must belong to a board'],
    select: false
  },
  columnOrder: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Column'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
});

const ColumnOrder = mongoose.model('ColumnOrder', columnOrderSchema);
module.exports = ColumnOrder;
