const Router = require('express');
const router = new Router()
const controller = require('../controllers/userController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', controller.updateUserData)
router.get('/:id?', roleMiddleware(['admin']), controller.getUsers)

module.exports = router