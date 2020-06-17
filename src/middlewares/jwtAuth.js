const jwt = require("jsonwebtoken");
import { JWT_SECRET } from "../config/keys";

export default (req, res, next) => {
  // check if there's no auth token
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ errors: [{ msg: "please provide auth token" }] });
  }
  // Get token from header
  const token = req.headers.authorization.split(" ")[1];

  // Verify token
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ errors: [{ msg: error.message }] });
    } else {
      req.user = decoded.user;
      console.log(decoded)
      next();
    }
  });
};
