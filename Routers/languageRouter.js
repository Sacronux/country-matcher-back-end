const Router = require('express');
const router = new Router()
const controller = require('../controllers/languageController')

router.get('/', controller.getLanguage)

module.exports = router