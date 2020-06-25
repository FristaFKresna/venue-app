import sequelize from '../config/db';
import { INTEGER, STRING, GEOMETRY, DATE, TIME, DATEONLY, Sequelize, DECIMAL, UUID, BIGINT, TEXT } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import User from './User'

export const Venue = sequelize.define('venue', {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true
  },
  name: STRING(255),
  address: TEXT,
  location: GEOMETRY('POINT'),
  imageUrl: STRING(255),
  city: STRING(150)
});

export const Package = sequelize.define('package', {
  name: STRING(255),
  description: TEXT,
  pricePerPax: DECIMAL,
  slotTimeStarts: TIME,
  slotTimeEnds: TIME
});

export const DateTime = sequelize.define('dateTime', {
  date: { type: DATEONLY }
});

DateTime.belongsTo(Package);

export const Reservation = sequelize.define('reservation', {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true
  }
});

// ini optional btw
export const ReservedDateTime = sequelize.define('reservedDateTime', {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true
  }
});

export const Review = sequelize.define('review', {
  comment: {
    type: STRING(255)
  }, rating: {
    type: DECIMAL(1)
  }
});

export const Order = sequelize.define(
  'order',
  {
    id: {
      primaryKey: true,
      type: UUID
    },
    total: DECIMAL,
    status: { type: STRING(30), defaultValue: 'pending' }, // ganti ke enum lebih bagus
    va_number: BIGINT,
    transaction_id: STRING(255)
  },
  { timestamps: true }
);

export const Wishlist = sequelize.define('wishlist')
export const wishlistVenue = sequelize.define('wishlistVenue')

Wishlist.belongsToMany(Venue, {through: wishlistVenue})
Venue.belongsToMany(Wishlist, {through: wishlistVenue})

Order.beforeCreate((order) => {
  order.id = uuidv4();
});

Order.belongsTo(Reservation);
Reservation.hasOne(Order);

Reservation.belongsToMany(DateTime, { through: ReservedDateTime });
DateTime.belongsToMany(Reservation, { through: ReservedDateTime });

Venue.hasMany(Package);
Package.belongsTo(Venue);
Venue.hasMany(Review)
