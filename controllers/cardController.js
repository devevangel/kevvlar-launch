const Card = require('../models/CardModel');
const Column = require('../models/ColumnModel');
const catchAsync = require('../utils/catchAsync');

// Create card
exports.createCard = catchAsync(async (req, res) => {
  const card = await Card.create(req.body);

  await Column.findByIdAndUpdate(req.body.column, {
    $push: { cardOrder: card._id }
  });

  res.status(201).json({
    status: 'success',
    data: {
      card
    }
  });
});

// Update card
exports.updateCard = catchAsync(async (req, res) => {
  const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      card
    }
  });
});

// Delete card
exports.deleteCard = catchAsync(async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
