export default (req, res, next) => {
    console.log(req.user, req.params.id)
    if(req.user.id != req.params.id) {
        return res.status(403).send('not authorized')
    }
    next()
}