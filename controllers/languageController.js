const english = require('../JSONs/Languages/english.json')
const deutch = require('../JSONs/Languages/deutch.json')
const russian = require('../JSONs/Languages/russian.json')

const getJsonByName = name => {
  switch (name) {
    case 'en':
      return english
    case 'de':
      return deutch
    case 'ru':
      return russian   
    default:
      return english  
  }
}

class languageController {
  getLanguage = async (req, res) => {
    try {
      console.log(req.query)
      const language = req.query.language;
      const languageJson = getJsonByName(language)
      if (!language || !languageJson) {
        return res.status(400).json({ message: 'Language not found' })
      }
      return res.status(200).json(getJsonByName(language))
    } catch (e) {
      return res.status(400).json({ message: 'Bad request' })
    }
  }
}

module.exports = new languageController()