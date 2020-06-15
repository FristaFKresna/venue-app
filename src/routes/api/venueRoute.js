import { Router } from "express";
import {
  Venue,
  Package,
  ReservedDateTime,
  DateTime,
} from "../../modelSQL/Venue";
import { Op } from "sequelize";

const route = Router();

route.get("/", (req, res) => {
  Venue.findAll()
    .then((venues) => {
      res.send(venues);
    })
    .catch((err) => {
      res.status(500).send({ errors: [{ msg: err.msg }] });
    });
});

route.get("/:id", (req, res) => {
  Venue.findByPk(req.params.id, { include: Package })
    .then((venue) => {
      res.send(venue.get({ plain: true }));
    })
    .catch((err) => {
      res.status(500).send({ errors: [{ msg: err.msg }] });
    });
});

route.get("/:id/packages", (req, res) => {
  Package.findAll({ where: { venueId: req.params.id }, raw: true })
    .then((packages) => {
      res.send(packages);
    })
    .catch((err) => {
      res.status(500).send({ errors: [{ msg: err.message }] });
    });
});

route.get("/:id/available", async (req, res) => {
  try {
    const reservedVenuePackageAtDate = await DateTime.findAll({
      where: { date: req.query.date },
      include: [{ model: Package, where: { venueId: req.params.id } }],
    });
    const ids = reservedVenuePackageAtDate.map((elem) => elem.packageId);
    const available = await Package.findAll({
      where: {
        id: { [Op.notIn]: ids },
        venueId: req.params.id,
      },
      raw: true,
    });
    res.send(available);
  } catch (err) {
    res.status(500).send({ errors: [{ msg: err.message }] });
  }
});
export default route;
