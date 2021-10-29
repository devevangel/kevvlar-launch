const Board = require('../models/BoardModel');
const Column = require('../models/ColumnModel');
const Card = require('../models/CardModel');
const ColumnOrder = require('../models/ColumnOrderModel');
const catchAsync = require('../utils/catchAsync');

// Create board
exports.createBoard = catchAsync(async (req, res) => {
  const newBoard = await Board.create({
    title: req.body.title,
    user: req.user._id
  });

  await ColumnOrder.create({
    board: newBoard._id,
    columnOrder: []
  });

  res.status(201).json({
    status: 'success',
    data: {
      board: newBoard
    }
  });
});

//get boards
exports.getBoards = catchAsync(async (req, res) => {
  const boards = await Board.find({ user: req.user._id }).select('-__v -user');

  res.status(200).json({
    status: 'success',
    length: boards.length,
    data: {
      boards
    }
  });
});

// Get board
exports.getBoard = catchAsync(async (req, res) => {
  const board = await Board.find({
    _id: req.params.id,
    user: req.user._id
  });

  res.status(200).json({
    status: 'success',
    data: {
      board
    }
  });
});

// Update board
exports.updateBoard = catchAsync(async (req, res) => {
  const board = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      board
    }
  });
});

// Delete board and all its corresponding cards and columns
exports.deleteBoard = catchAsync(async (req, res) => {
  await Card.deleteMany({ board: req.params.id });
  await Column.deleteMany({ board: req.params.id });
  await ColumnOrder.deleteMany({ board: req.params.id });
  await Board.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});
