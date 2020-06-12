import { Router } from "express";
import jwtAuth from "../../middlewares/jwtAuth";

const route = Router()

route.get('/', jwtAuth, (req, res) => {
    res.send(req.user)
})

export default route