import { Router } from "express";
import { Package } from "../../modelSQL/Venue";

const route = Router();

route.get("/:id", (req, res) => {
  Package.findByPk(req.params.id)
    .then((p) => {
      res.send(p.toJSON());
    })
    .catch((err) => {
      res.status(500).send({ errors: [{ msg: err.message }] });
    });
});
export default route;
