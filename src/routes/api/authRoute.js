import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../modelSQL/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/keys';
import bcrypt from 'bcrypt';
import jwtAuth from '../../middlewares/jwtAuth';

const route = Router();

const loginValidates = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').isLength({ min: 5, max: 12 }).withMessage('must > 5 < 12')
];
route.post('/login', loginValidates, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // check if user exist
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) throw new Error('user inexist');

    // check if password match
    const isMatch = await bcrypt.compare(password, user.password);

    // send jwt on success
    if (isMatch) {
      // TOOD hapus selain id
      const token = jwt.sign({ user: { id: user.id, email: user.email, username: user.username } }, JWT_SECRET, {
        expiresIn: '5 days'
      });
      res.send({ token });
    } else throw new Error("(dont send this message in production!) passwrod didn't match");
  } catch (err) {
    return res.status(500).send({ errors: [ { msg: err.message } ] });
  }
});

const registerValidates = [
  ...loginValidates,
  check('re_password').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("password don't match");
    return value;
  })
];
route.post('/register', registerValidates, async (req, res) => {
  // extract error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { email, password, username, role } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) throw new Error('user already exists!');
    // not needed for a while
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, password: password, username, role });
    const token = jwt.sign({ user: { id: newUser.id, email: newUser.email } }, JWT_SECRET, {
      expiresIn: '5 days'
    });
    res.send({ token });
  } catch (err) {
    return res.status(500).send({ errors: [ { msg: err.message } ] });
  }
});

route.post('/deserialize', jwtAuth, (req, res) => {
  User.findByPk(req.user.id, {attributes: {exclude: ['password']}})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(400).send({ errors: [ { msg: err.msg } ] }));
});
export default route;
