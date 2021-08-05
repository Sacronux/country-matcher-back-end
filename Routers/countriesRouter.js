const Router = require('express');
const router = new Router()
const controller = require('../controllers/countriesController')

router.post('/:id', controller.setCountry)
router.post('/', controller.setCountriesList)
router.get('/:id?', controller.getCountries)

module.exports = router