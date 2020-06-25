import express from "express";
require("dotenv").config();
import authRoute from "./routes/api/authRoute";
import sequelize from "./config/db";
import User from "./modelSQL/User";
import users, { venues, packages } from "./config/dummyData";
import { Venue, Package } from "./modelSQL/Venue";
import venueRoute from "./routes/api/venueRoute";
import userRoute from "./routes/api/userRoute";
import packageRoute from "./routes/api/packageRoute";
// import connection from "./config/mysql";
import midtransRoute from './routes/api/midtransRoute'


const app = express();
console.log(process.env.MYSQL_USER);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/venues", venueRoute);
app.use("/api/users", userRoute);
app.use('/api/packages', packageRoute)
app.use('/api/midtrans', midtransRoute)

// connection.connect()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port..", PORT);
  sequelize
    .sync({ force: true })
    .then(() => {
      // create a dummy user
      User.bulkCreate(users, { individualHooks: true })
        .then((users) => {
          users.forEach((user) => console.log(user.get({ plain: true })));
          return Venue.bulkCreate(venues);
        })
        .then((venues) => {
          venues.forEach((venue) => console.log(venue.get({ plain: true })));
          return Package.bulkCreate(packages);
        })
        .then((packages) => {
          packages.forEach((p) => {
            console.log(p.get({ plain: true }));
          });
        })
        .catch(console.log);
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});
