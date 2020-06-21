import { check, validationResult } from 'express-validator';

export default [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 5, max: 12 }).withMessage('must > 5 < 12')
  ];