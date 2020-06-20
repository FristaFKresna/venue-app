import { Router, raw } from 'express';
import User from '../../modelSQL/User';
import { Venue, Reservation, Package, DateTime, ReservedDateTime, Order } from '../../modelSQL/Venue';
import sequelize from '../../config/db';
import { Op } from 'sequelize';
import core from '../../config/midtrans';
import { PackagePayment } from '../../models/PaymentPayload';
const route = Router();

// TODO protect route
route.get('/:id', (req, res) => {
  User.findByPk(req.params.id, { include: Venue }).then((user) => res.send(user.toJSON())).catch((err) => {
    res.send({ errors: [ { msg: err.msg } ] });
  });
});

route.get('/:id/reservations', async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { userId: req.params.id },
    include: [ { model: DateTime, include: [ { model: Package } ] } ]
  });
  res.send(reservations);
});

route.post('/:id/reservations', async (req, res) => {
  console.log(req.body);

  try {
    // TODO refactor body with desructuring
    const result = await sequelize.transaction(async (t) => {
      const rsv = await Reservation.create({ userId: req.params.id }, { transaction: t });
      const currentDate = await DateTime.findOne({
        where: { date: req.body.date, packageId: req.body.packageId },
        include: [
          {
            model: Reservation,
            include: [ { model: Order, where: { [Op.or]: [ { status: 'pending' }, { status: 'success' } ] } } ]
          }
        ],
        transaction: t
      });
      if (currentDate) throw new Error("can't book the same package at the same time");
      const date = await DateTime.create({ date: req.body.date, packageId: req.body.packageId }, { transaction: t });
      const rsvDate = await ReservedDateTime.create({ reservationId: rsv.id, dateTimeId: date.id }, { transaction: t });
      const pkg = await Package.findByPk(req.body.packageId);
      const order = await Order.create(
        { reservationId: rsv.id, total: +req.body.numPeople * +pkg.pricePerPax },
        { transaction: t }
      );
      const user = await User.findByPk(req.params.id, { transaction: t });
      const response = await core.charge(
        new PackagePayment(
          order.total,
          order.id,
          {
            bank: req.body.bank,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            expireMin: 1
          },
          pkg
        )
      );
      await order.update(
        {
          status: response.transaction_status,
          va_number: response.va_numbers[0].va_number,
          transaction_id: response.transaction_id
        },
        { transaction: t }
      );
      return { response, order };
      // return rsvDate
    });

    res.send(result);
  } catch (err) {
    res.status(400).send({ errors: [ { msg: err.message } ] });
  }
});

route.get('/:id/orders', (req, res) => {
  User.findByPk(req.params.id, {
    include: [ { model: Reservation, include: [ { model: Order }, { model: DateTime, include: Package } ] } ]
  })
    .then((user) => res.send(user.reservations))
    .catch((err) => res.send(err));
});

export default route;
