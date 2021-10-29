const express = require('express');
const authController = require('../controllers/authController');
const cardController = require('../controllers/cardController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    cardController.createCard
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    cardController.updateCard
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    cardController.deleteCard
  );

module.exports = router;
