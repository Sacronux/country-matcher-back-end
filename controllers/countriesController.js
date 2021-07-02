const User = require('../models/User')
const Country = require('../models/Country')
const { validationResult } = require('express-validator')
 
class authController {
  async setCountry(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Updating Country failed', errors})
      }
      const body = req.body
      let candidate = await Country.findOneAndUpdate({alpha2Code: body.alpha2Code}, body)
      
      if (!candidate) {
        candidate = new Country(body) 
      }
      await candidate.save()
      return res.json({message: 'Country was successfuly updated'})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Country updating failed'})
    }
  }

  async setCountriesList(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: 'Updating Country failed', errors})
    }
    const countries = req.body
    if (!countries.isArray()) {
      return res.status(400).json({message: 'Provide list of countries in array', errors})
    }
    Promise.all(countries.map(async (country) => {
      let candidate = await Country.findOneAndUpdate({alpha2Code: country.alpha2Code}, country)
    
      if (!candidate) {
        candidate = new Country(country) 
      }
      await candidate.save()
    }))
    return res.json({message: 'Country was successfuly updated'})
  }

  async getCountries(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new authController()