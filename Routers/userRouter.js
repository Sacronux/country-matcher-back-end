const Router = require('express');
const router = new Router()
const controller = require('../controllers/userController')

router.post('/', controller.updateUserData)

module.exports = router