import {Router} from 'express'
import jwtAuth from '../../middlewares/jwtAuth'

const route = Router()

route.get('/', jwtAuth, (req, res) => {
  console.log(req.headers.authorization)
  res.send('test') 
})

export default route