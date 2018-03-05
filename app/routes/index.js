const router = require('express').Router()
const produceRoutes = require('./produce.routes')

module.exports = router

router.use('/api/produce', produceRoutes)