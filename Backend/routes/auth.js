const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('firstName')
      .isString()
      .isLength({min: 7})
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
    .isString()
    .isLength({min: 7})
    .trim()
    .not()
    .isEmpty(),
    body('nickname')
    .isString()
    .isLength({min: 7})
    .trim()
    .not()
    .isEmpty(),
    body('age')
    .isInt()
    .trim()
    .not()
    .isEmpty(),
    body('gender')
    .isString()
    .trim()
    .not()
    .isEmpty(),
    body('country')
    .trim()
    .not()
    .isEmpty(),
    body('address')
    .trim()
    .not()
    .isEmpty()
  ],
  authController.signup
);

router.post('/getAllUsers', authController.getAllUser);

module.exports = router;
