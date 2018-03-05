const router = require('express').Router()
const produceController = require('../controllers/produce.controller')
const helpers = require('../helpers/helpers')

module.exports = router

router.get('/', produceController.readAll)
router.post('/', helpers.cleanCheck(), produceController.create)
router.delete('/:id([0-9a-fA-F]{24})', produceController.delete)
router.put('/:id([0-9a-fA-F]{24})', helpers.cleanCheck(), produceController.update)