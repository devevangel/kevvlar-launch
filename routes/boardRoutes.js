const express = require('express');
const authController = require('../controllers/authController');
const boardController = require('../controllers/boardController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    boardController.getBoards
  )
  .post(
    authController.protect,
    authController.restrictTo('user'),
    boardController.createBoard
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    boardController.getBoard
  )
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    boardController.updateBoard
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    boardController.deleteBoard
  );

module.exports = router;
