import { Router, raw } from 'express';
import User from '../../modelSQL/User';
import {
  Venue,
  Reservation,
  Package,
  DateTime,
  ReservedDateTime,
  Order,
  Review,
  Wishlist,
  wishlistVenue
} from '../../modelSQL/Venue';
import sequelize from '../../config/db';
import { Op } from 'sequelize';
import core from '../../config/midtrans';
import { PackagePayment } from '../../models/PaymentPayload';
import jwtAuth from '../../middlewares/jwtAuth'
import userAuthorize from '../../middlewares/userAuthorize';
const route = Router();

// TODO protect route
route.get('/:id', jwtAuth, userAuthorize, (req, res) => {
  User.findByPk(req.params.id, { include: Venue }).then((user) => res.send(user.toJSON())).catch((err) => {
    res.send({ errors: [ { msg: err.msg } ] });
  });
});

// get user rvvs
route.get('/:id/reservations', async (req, res) => {
  const reservations = await Reservation.findAll({
    where: { userId: req.params.id },
    include: [ { model: DateTime, include: [ { model: Package, include: Venue } ] }, { model: Order, where: { status: 'success' } } ]
  });
  res.send(reservations);
});

// make rsvs
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
    });

    res.send(result);
  } catch (err) {
    res.status(400).send({ errors: [ { msg: err.message } ] });
  }
});

// get orders
route.get('/:id/orders', (req, res) => {
  User.findByPk(req.params.id, {
    include: [ { model: Reservation, include: [ { model: Order }, { model: DateTime, include: Package } ] } ]
  })
    .then((user) => res.send(user.reservations))
    .catch((err) => res.send(err));
});

// make comments
route.post('/:id/reviews', (req, res) => {
  const { rating, comment, venueId } = req.body;
  console.log(req.body);
  Review.create({ rating: rating, comment: comment, userId: req.params.id, venueId: venueId })
    .then((review) => {
      res.send(review.toJSON());
    })
    .catch((err) => {
      res.send({ errors: [ { msg: err.msg } ] });
    });
});

route.get('/:id/wishlist', (req, res) => {
  Wishlist.findOne({ where: { UserId: req.params.id }, include: Venue })
    .then((wish) => {
      res.send(wish);
    })
    .catch((err) => {
      res.status(500).send({ errors: [ { msg: err.message } ] });
    });
});

route.post('/:id/wishlist/venues', async (req, res) => {
  try {
    let wish = await Wishlist.findOne({ where: { userId: req.params.id } });
    if (!wish) {
      wish = await Wishlist.create({ userId: req.params.id });
    }

    const result = await wishlistVenue.create({
      userId: req.params.id,
      wishlistId: wish.id,
      venueId: req.body.venueId
    });
    res.send(result.toJSON());
  } catch (err) {
    res.status(400).send({ errors: [ { msg: err.message } ] });
  }
});

route.delete('/:id/wishlist/venues/:venueId', async (req, res) => {
  try {
    const wish = await Wishlist.findOne({ where: { userId: req.params.id } });
    const destroyed = await wishlistVenue.destroy({ where: [ { wishlistId: wish.id, venueId: req.params.venueId } ] });
    res.send(destroyed.toString())
  } catch (err) {
    res.status(400).send({ errors: [ { msg: err.message } ] });
  }
});
export default route;
