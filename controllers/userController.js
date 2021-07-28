const User = require('../models/User');
const { verifyAccessToken } = require('../utils/userUtils');

class userController {
  updateUserData = async (req, res) => {
    try {
      const { username, password, citizenship } = req.body
      const payloadByToken = verifyAccessToken(token)
      if (!payloadByToken) {
        return res.status(403).json({  })
      }
      const candidate = await User.findOneAndUpdate({ username }, {
        username,
        password,
        citizenship
      })
      await candidate.save()
      return res.json({message: 'User was successfuly updated'})
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'User was successfuly updated' })
    }
  }
}

module.exports = new userController()