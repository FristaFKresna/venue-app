import { Sequelize, UUID, STRING } from "sequelize";
import sequelize from "../config/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Venue, Reservation } from "./Venue";
const User = sequelize.define(
  "user",
  {
    // id: { primaryKey: true, type: UUID },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    role: {
      type: Sequelize.ENUM("renter", "rentee", "admin"),
      allowNull: false,
    },
    // profile
    address: {
      type: Sequelize.STRING(255),
    },
    avatar: Sequelize.STRING(255),
    firstName: Sequelize.STRING(255),
    lastName: Sequelize.STRING(255),
    location: {
      type: Sequelize.GEOMETRY("POINT"),
    },
  },
  {
    // timestamps: true
  }
);

User.beforeCreate((user) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      // user.id = uuidv4();
    })
    .catch((err) => {
      throw new Error("hash failed");
    });
});


User.hasMany(Venue)
User.hasMany(Reservation)

export default User;
