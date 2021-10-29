const Column = require('../models/ColumnModel');
const Card = require('../models/CardModel');
const ColumnOrder = require('../models/ColumnOrderModel');
const catchAsync = require('../utils/catchAsync');

// Create column
exports.createColumn = catchAsync(async (req, res) => {
  const newColumn = await Column.create(req.body);

  await ColumnOrder.findOneAndUpdate(
    { board: newColumn.board },
    { $push: { columnOrder: newColumn._id } }
  );

  res.status(201).json({
    status: 'success',
    data: {
      newColumn
    }
  });
});

exports.getColumns = catchAsync(async (req, res) => {
  const columns = await Column.find({ board: req.query.board }).populate(
    'cards'
  );

  res.status(200).json({
    status: 'success',
    length: columns.length,
    data: {
      columns
    }
  });
});

// Update column
exports.updateColumn = catchAsync(async (req, res) => {
  const column = await Column.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      column
    }
  });
});

// change card order in column
exports.changeCardOrderInColumn = catchAsync(async (req, res) => {
  const column = await Column.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      column
    }
  });
});

exports.changeCardColumnAndOrder = catchAsync(async (req, res) => {
  // Remove card from current column card order
  await Column.findByIdAndUpdate(req.params.id, {
    $pull: { cardOrder: req.body.cardId }
  });

  // set card order for new destination column
  const column = await Column.findByIdAndUpdate(
    req.body.destinationColumnId,
    {
      cardOrder: req.body.cardOrder
    },
    {
      new: true,
      runValidators: true
    }
  );

  // add card to new destination column
  const card = await Card.findByIdAndUpdate(
    req.body.cardId,
    {
      column: req.body.destinationColumnId
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      column,
      card
    }
  });
});

// Delete column
exports.deleteColumn = catchAsync(async (req, res) => {
  await Card.deleteMany({ column: req.params.id });
  await ColumnOrder.findOneAndUpdate(
    { board: req.query.board },
    { $pull: { columnOrder: req.params.id } }
  );
  await Column.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
