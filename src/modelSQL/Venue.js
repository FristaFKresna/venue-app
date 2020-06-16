import sequelize from "../config/db";
import {
  INTEGER,
  STRING,
  GEOMETRY,
  DATE,
  TIME,
  DATEONLY,
  Sequelize,
  DECIMAL
} from "sequelize";

export const Venue = sequelize.define("venue", {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
  },
  name: STRING(255),
  address: STRING(255),
  location: GEOMETRY("POINT"),
  imageUrl: STRING(255),
  rating: DECIMAL(1)
});

export const Package = sequelize.define("package", {
  name: STRING(255),
  description: STRING(255),
  slotTimeStarts: TIME,
  slotTimeEnds: TIME,
});

export const DateTime = sequelize.define("dateTime", {
  date: {type: DATEONLY},
});

DateTime.belongsTo(Package);

export const Reservation = sequelize.define("reservation", {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
  },
});

export const ReservedDateTime = sequelize.define("reservedDateTime", {
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true
  },
});

Reservation.belongsToMany(DateTime, { through: ReservedDateTime });
DateTime.belongsToMany(Reservation, {through: ReservedDateTime})

Venue.hasMany(Package);
