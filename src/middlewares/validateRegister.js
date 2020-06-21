import validateLogin from "./validateLogin";
import { check } from "express-validator";

export default [
    ...validateLogin,
    check('re_password').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("password don't match");
      return value;
    })
  ];

