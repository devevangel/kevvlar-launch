const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
      required: [true, 'Column must belong to a board']
    },
    title: {
      type: String,
      required: [true, 'A Column must have a title']
    },
    cardOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

columnSchema.virtual('cards', {
  ref: 'Card',
  foreignField: 'column',
  localField: '_id'
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
