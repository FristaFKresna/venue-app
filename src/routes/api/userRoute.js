import { Router } from 'express'
const { check, validationResult } = require('express-validator')

const route = Router()

route.get('/', (req, res) => {
  res.send('user route')
})

route.post(
  '/',
  [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password', 'must > 5').isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.send(req.body)
  }
)

export default route
