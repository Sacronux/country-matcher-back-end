const Router = require('express');
const router = new Router()
const controller = require('../controllers/authController')
const { check } = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration', [
  check('username', 'Name can\'t be empty').notEmpty(),
  check('password', 'Password length must be greater than 8 and less than 80 symbols').isLength({ min: 8, max: 80 }),
  
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']), controller.getUsers)

module.exports = router