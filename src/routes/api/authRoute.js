import { Router } from 'express';
import jwtAuth from '../../middlewares/jwtAuth';
import { login, register, deserialize, testSendingEmail, resendOTP, verify } from '../../controllers/authControllers';
import validateLogin from '../../middlewares/validateLogin';
import validateRegister from '../../middlewares/validateRegister';

const SMTPConnection = require('nodemailer/lib/smtp-connection');
const route = Router();


route.post('/login', validateLogin, login);

route.post('/register', validateRegister, register);

route.post('/deserialize', jwtAuth, deserialize);

route.post('/verify', jwtAuth, verify);

route.get('/mail', testSendingEmail);


route.post('/resend', jwtAuth, resendOTP);

export default route;
