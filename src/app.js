import express from 'express'
require('dotenv').config()
import testRoute from './routes/api/testRoute'
import userRoute from './routes/api/userRoute'
import authRoute from './routes/api/authRoute'
import protectedRoute from './routes/api/protectedRoute'
import sequelize from './config/db'
import User from './modelSQL/User'


const app = express()

app.use(express.json())

app.use('/api/test', testRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/protected', protectedRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('listening on port..', PORT)
  sequelize
    .sync({ force: true })
    .then(() => {
      // create a dummy user
      User.create({ email: 'maman@mail.co', password: '$2b$10$ufQfsIwz2onN/MKNI6M9b.5HPIf6Nhf9QyWGvP4bPUID3Faunpquu' })
      .then(user => console.log('created user'))
      .catch(console.log)
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
})
