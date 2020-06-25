import { Router } from 'express';
import { Venue, Package, ReservedDateTime, DateTime, Reservation, Order, Review } from '../../modelSQL/Venue';
import User from '../../modelSQL/User';
import { Op, fn, col } from 'sequelize';
import sequelize from '../../config/db';

const route = Router();

// route.get('/', (req, res) => {
//   let filter = req.query.city ? { where: { city: req.query.city } } : {};

//   Venue.findAll({ ...filter, include: [ { model: Review, attributes: [ 'rating' ] } ] })
//     .then((venues) => {
//       const newVenues = venues.map((venue) => {
//         if (venue.reviews.length > 0) {
//           const avgRating = venue.reviews.reduce((acc, curr) => acc + +curr.rating, 0) / venue.reviews.length;
//           venue.rating = avgRating;
//         } else {
//           venue.rating = 0;
//         }
//         return venue;
//       });
//       res.send(newVenues);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({ errors: [ { msg: err.msg } ] });
//     });
// });
route.get('/', (req, res) => {
  let filters = []
  if(req.query.city) {
    filters.push({city: req.query.city})
  }
  
  const orders = []
  if(req.query.byRating) {
    orders.push([col('avgRating'), 'desc'])
    console.log('called')
  }

  Venue.findAll({
    where: filters,
    attributes: {
      include: [ [ fn('AVG', col('reviews.rating')), 'avgRating' ] ]
    },
    include: [
      {
        model: Review,
        attributes: []
      }
    ],
    group: ['venue.id'],
    order: orders
  }).then(data => {
    res.send(data)
  });
});

route.get('/cities', (req, res) => {
  Venue.findAll({ group: 'city', attributes: [ 'city' ] })
    .then((venues) => res.send(venues.map((venue) => venue.city)))
    .catch((err) => res.send({ errors: [ { msg: err.msg } ] }));
});

route.get('/:id', (req, res) => {
  Venue.findByPk(req.params.id, { include: [ { model: Package }, { model: Review, include: [ { model: User } ] } ] })
    .then((venue) => {
      res.send(venue.get({ plain: true }));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ errors: [ { msg: err.msg } ] });
    });
});

route.get('/:id/packages', (req, res) => {
  Package.findAll({ where: { venueId: req.params.id }, raw: true })
    .then((packages) => {
      res.send(packages);
    })
    .catch((err) => {
      res.status(500).send({ errors: [ { msg: err.message } ] });
    });
});

route.get('/:id/available', async (req, res) => {
  try {
    const reservedVenuePackageAtDate = await DateTime.findAll({
      where: {
        [Op.and]: [
          { date: req.query.date },
          { '$package.venueId$': req.params.id },
          { [Op.or]: [ { '$reservations.order.status$': 'pending' }, { '$reservations.order.status$': 'success' } ] }
        ]
      },
      include: [
        { model: Package },
        {
          model: Reservation,
          include: [ { model: Order, where: { [Op.or]: [ { status: 'pending' }, { status: 'success' } ] } } ]
        }
      ]
    });
    const ids = reservedVenuePackageAtDate.map((elem) => elem.packageId);
    const available = await Package.findAll({
      where: {
        id: { [Op.notIn]: ids },
        venueId: req.params.id
      },
      raw: true
    });
    res.send(available);
  } catch (err) {
    res.status(500).send({ errors: [ { msg: err.message } ] });
  }
});

export default route;
