import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../../modelSQL/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/keys';
import bcrypt from 'bcrypt';
import jwtAuth from '../../middlewares/jwtAuth';
import faker from 'faker';
import transporter, { sendVerificationEmail } from '../../config/transporter';
import moment from 'moment';

const SMTPConnection = require('nodemailer/lib/smtp-connection');
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
    const verifToken = faker.random.number({ min: 1000, max: 9999 });
    const newUser = await User.create({ email, password: password, username, role, otp: verifToken });
    const token = jwt.sign({ user: { id: newUser.id, email: newUser.email } }, JWT_SECRET, {
      expiresIn: '5 days'
    });
    res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ errors: [ { msg: err.message } ] });
  }
});

route.post('/deserialize', jwtAuth, (req, res) => {
  User.findByPk(req.user.id, { attributes: { exclude: [ 'password' ] } })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(400).send({ errors: [ { msg: err.msg } ] }));
});

route.get('/mail', (req, res) => {
  const mailopts = {
    from: 'rikoaxel@gmail.com',
    to: 'fauzan.habib@outlook.com',
    subject: "you're georegeous",
    text: 'hello world',
    html: '<h1>hello</h1>'
  };
  transporter.sendMail(mailopts, (err, info) => {
    if (err) return res.send(err);
    res.send(info);
  });
});

route.post('/verify', jwtAuth, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      const now = moment();
      let expiryTime = moment(user.tokenExpiration);
      console.log(now.isAfter(expiryTime));

      if (now.isAfter(expiryTime)) {
        throw new Error('token expired');
      }
      if (user.otp == req.body.otp) {
        user.isVerified = true;
      } else {
        throw new Error('wrong pin');
      }
      return user.save();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.status(400).send({ errors: [ { msg: err.message } ] }));
});

route.post('/resend', jwtAuth, async (req, res) => {
  try {
    const newOtp = faker.random.number({ min: 1000, max: 9999 });
    const user = await User.findByPk(req.user.id);
    user.otp = newOtp;
    user.tokenExpiration = moment().add(1, 'minutes')
    await user.save();
    // use mobile connection bcs indiehome blocks email out
    // await sendVerificationEmail(newOtp)
    res.send(user.toJSON())
  } catch (err) {
    res.status(400).send({ errors: [ { msg: err.message } ] });
  }
});
export default route;
