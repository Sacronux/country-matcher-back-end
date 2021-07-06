"use strict"
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config')
const { asAdmin, asModerator } = require('../utils/authUtils')

const generateAccessToken = (id, roles, username) => {
  const payload = {
    id,
    roles,
    username,
  }
  return jwt.sign(payload, secret, { expiresIn: '1m' })
}

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, secret)
  } catch (e) {
    return null
  }
}

const renewAuthByToken = (token, payloadByToken) => {
  const { username, roles } = payloadByToken
  response = {
    token,
    username,
    roles
  }
  return res.json(response)
}

const checkUserForAdminRole = (user) => user.roles?.includes('admin')
const checkUserForModeratorRole = (user) => user.roles?.includes('moderator')
 
class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Registration failed', errors})
      }
      const { username, password } = req.body
      const candidate = await User.findOne({username})
      if (candidate) {
        return res.status(403).json({ message: `User with the name ${username} already exists` })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'user' })
      const user = new User({username, password: hashPassword, roles: [userRole.value]})
      await user.save()
      return res.json({message: 'User was successfully registered'})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }

  async login(req, res) {
    try {
      const { username, password, token, asAdmin, asModerator } = req.body
      let response
      let userIsAdmin
      let userIsModerator
      const payloadByToken = verifyAccessToken(token)

      if (token && payloadByToken) {
        return renewAuthByToken(token, payloadByToken)
      }

      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({error: `User ${username} does not exist`})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: 'Invalid password'})
      }
      if (asAdmin) {
        if (!checkUserForAdminRole(user)) {
          return res.status(400).json({message: `User ${username} is not an admin`})
        }
        userIsAdmin = true
      }
      if (asModerator) {
        if (!checkUserForModeratorRole(user) && !checkUserForAdminRole(user)) {
          return res.status(400).json({message: `User ${username} is not a moderator`})
        }
        userIsModerator = true
      }   
      const newToken = generateAccessToken(user._id, user.roles, user.username)
      response = {
        token: newToken,
        username: user.username,
        roles: user.roles,
      }
      return res.json(response)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new authController()