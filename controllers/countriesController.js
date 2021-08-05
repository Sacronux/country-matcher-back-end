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

      if (!req.params.id) {
        res.status(400).json({message: 'Country alpha2Code is required'})
      }

      let candidate = await Country.findOne({alpha2Code: req.params.id})
      if (!candidate) {
        candidate = new Country(body)
        await candidate.save()
        return res.status(200).json({message: 'Country was successfuly updated'})
      }
      const plainObjectCanidate = JSON.parse(JSON.stringify(candidate))
      await Country.updateOne({alpha2Code: req.params.id}, {...plainObjectCanidate, ...body})

      await candidate.save()
      return res.status(200).json({message: 'Country was successfuly updated'})
    } catch (e) {
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
    return res.status(200).json({message: 'Country was successfuly updated'})
  }

  async getCountries(req, res) {
    try {
      let result;
      
      if (req.params.id) {
        result = await Country.findOne({alpha2Code: req.params.id})
        return res.status(200).json(result)
      }

      result = await Country.find()
      
      res.status(200).json(result)
    } catch (e) {
      res.status(400).json({message: 'Failed to get country'})
    }
  }
}

module.exports = new authController()