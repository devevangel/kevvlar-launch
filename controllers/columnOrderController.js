const ColumnOrder = require('../models/ColumnOrderModel');
const catchAsync = require('../utils/catchAsync');

// update column order
exports.updateColumnOrder = catchAsync(async (req, res) => {
  const order = await ColumnOrder.findOneAndUpdate(
    { board: req.query.board },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});

// get column order
exports.getColumnOrder = catchAsync(async (req, res) => {
  const order = await ColumnOrder.findOne({ board: req.query.board });

  res.status(200).json({
    status: 'success',
    data: {
      order
    }
  });
});
