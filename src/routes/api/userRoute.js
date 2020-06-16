import { Router, raw } from "express";
import User from "../../modelSQL/User";
import { Venue, Reservation, Package, DateTime, ReservedDateTime } from "../../modelSQL/Venue";
import sequelize from "../../config/db";
import { Op } from "sequelize";
const route = Router();

// TODO protect route
route.get("/:id", (req, res) => {
  User.findByPk(req.params.id, { include: Venue })
    .then((user) => res.send(user.toJSON()))
    .catch((err) => {
      res.send({ errors: [{ msg: err.msg }] });
    });
});

route.get("/:id/reservations", async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { userId: req.params.id },
    include: [{ model: DateTime, include: [{ model: Package }] }],
  });
  res.send(reservations);
});

route.post("/:id/reservations",async (req, res) => {
  console.log(req.body)
  try {
    const result = await sequelize.transaction(async (t) => {
      const rsv = await Reservation.create({userId: req.params.id}, {transaction: t})
      const currentDate = await DateTime.findOne({where: {date: req.body.date, packageId: req.body.packageId}})
      if(currentDate) throw new Error('can\'t book the same package at the same time')
      const date = await DateTime.create({date: req.body.date, packageId: req.body.packageId}, {transaction: t})
      const rsvDate = await ReservedDateTime.create({reservationId: rsv.id, dateTimeId: date.id}, {transaction: t})
      return rsvDate;
    })
    res.send(result.get({plain: true}))
  } catch (err) {
    res.status(400).send({errors: [{msg: err.message}]})
  }
})

export default route;
