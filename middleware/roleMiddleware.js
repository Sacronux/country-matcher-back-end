const jwt = require('jsonwebtoken')
const { secret } = require('../config')

module.exports = function(roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(400).json({message: 'User needs to be authorized'})
      }
      const { roles: userRoles } = jwt.verify(token, secret)
      let hasRole = false
      userRoles.forEach(role => {
        if (roles?.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(400).json({message: 'Forbidden action'})
      }
      next()
    } catch (e) {
      return res.status(400).json({message: 'User needs to be authorized'})
    }
  }  
}