const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, secret)
  } catch (e) {
    return null
  }
}

const renewAuthByToken = (token, payloadByToken, res) => {
  const { username, roles } = payloadByToken
  const response = {
    token,
    username,
    roles
  }
  return res.json(response)
}

const generateAccessToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  }
  return jwt.sign(payload, secret, { expiresIn: '180d' })
}

module.exports = {
  verifyAccessToken,
  renewAuthByToken,
  generateAccessToken
}