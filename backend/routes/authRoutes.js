const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Маршрут для регистрации пользователя
router.post(
  '/register',
  [
    body('name').not().isEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
  ],
  registerUser
);

// Маршрут для логина пользователя
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').not().isEmpty().withMessage('Пароль обязателен'),
  ],
  loginUser
);

module.exports = router;
