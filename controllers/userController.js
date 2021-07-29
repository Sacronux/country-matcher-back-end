const User = require('../models/User');
const { verifyAccessToken } = require('../utils/userUtils');

class userController {
  updateUserData = async (req, res) => {
    try {
      const { username, citizenship } = req.body

      const payloadByToken = verifyAccessToken(req.headers.authorization)
      if (!payloadByToken) {
        return res.status(403).json({ message: 'Authorization required' })
      }

      const newUsername = username ?? payloadByToken.username;
      const newCitizenship = citizenship ?? payloadByToken.citizenship;
      if (!newUsername) {
        return res.status(400).json({ message: 'Authorization failed, try to logout and login again' })
      }
      const candidate = await User.findOneAndUpdate({ username: newUsername }, {
        username: newUsername,
        citizenship: newCitizenship
      })

      await candidate.save()
      return res.json({message: 'User was successfuly updated'})
    } catch (e) {
      res.status(400).json({ message: 'User was successfuly updated' })
    }
  }
}

module.exports = new userController()