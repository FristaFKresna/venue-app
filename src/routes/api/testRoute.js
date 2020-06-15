import { Router } from "express";
import jwtAuth from "../../middlewares/jwtAuth";
import User from "../../modelSQL/User";
// import { Task } from "../../modelSQL/User";

const route = Router();

// route.post("/", jwtAuth, (req, res) => {
//   console.log(req.headers.authorization);
//   Task.create({ title: "mandi pagi", userId: req.user.id })
//     .then((task) => {
//       console.log("success");
//       res.send(task.get({ plain: true }));
//     })
//     .catch((err) => {
//       console.log("fail");

//       res.status(400).send({ errors: [{ msg: err.message }] });
//     });
// });

route.get("/rentee", (req, res) => {
  res.send('suket teki')
});

export default route;
