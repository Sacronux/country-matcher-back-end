const { model, Schema } = require('mongoose')

const Country = new Schema({
  name: {type: String, required: true},
  alpha2Code: {type: String, required: true},
  alpha3Code: {type: String, required: true},
  callingCodes: [{type: String}],
  borders: [{type: String, required: true}],
  timezones: [{type: String, required: true}],
  region: {type: String},
  numericCode: {type: String},
  currencies: [{
      code: {type: String},
      name: {type: String, required: true},
      symbol: {type: String},
    }],
  languages: [
    {
      iso639_1: {type: String},
      iso639_2: {type: String},
      name: {type: String, required: true},
      nativeName: {type: String, required: true},
    }
  ],
  flag: {type: String, required: true},
})

module.exports = model('Country', Country)