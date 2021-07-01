const Router = require('express');
const router = new Router()
const controller = require('../controllers/countriesController')

router.post('/country', controller.setCountry)
router.post('/countries-list', controller.setCountriesList)

module.exports = router