import { Sequelize } from "sequelize";
import sequelize from "../config/db";

const User = sequelize.define('user', {
    // attributes
    email: {
      type: Sequelize.STRING(45),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
  }, {
    // options
  });

export default User;