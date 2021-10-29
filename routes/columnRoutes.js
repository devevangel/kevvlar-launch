const express = require('express');
const authController = require('../controllers/authController');
const columnController = require('../controllers/columnController');

const router = express.Router();

router
  .route('/changecardorderwithincolumn/:id')
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    columnController.changeCardOrderInColumn
  );

router
  .route('/changecardcolumnandorder/:id')
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    columnController.changeCardColumnAndOrder
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    columnController.getColumns
  )
  .post(
    authController.protect,
    authController.restrictTo('user'),
    columnController.createColumn
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    columnController.updateColumn
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    columnController.deleteColumn
  );

module.exports = router;
