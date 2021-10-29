const express = require('express');
const authController = require('../controllers/authController');
const columnOrderController = require('../controllers/columnOrderController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    columnOrderController.getColumnOrder
  )
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    columnOrderController.updateColumnOrder
  );

module.exports = router;
