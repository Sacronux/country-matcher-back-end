const User = require('../models/User');
const { verifyAccessToken } = require('../utils/userUtils');

class userController {
  updateUserData = async (req, res) => {
    try {
      const { username, citizenship } = req.body

      const payloadByToken = verifyAccessToken(req.headers.authorization)
      if (!payloadByToken) {
        return res.status(403).json({ message: 'User updating error: authorization required, please try to login again' })
      }

      const newUsername = username ?? payloadByToken.username;
      const newCitizenship = citizenship ?? payloadByToken.citizenship;
      
      if (!newUsername) {
        return res.status(400).json({ message: 'User updating error: authorization failed, try to logout and login again' })
      }

      let potentialSameNameUser = null;

      if (username) {
        potentialSameNameUser = await User.findOne({ username })
      }
      if (potentialSameNameUser) {
        return res.status(400).json({ message: 'User updating error: user with same name is already exists' });
      }

      const currentUser = await User.findOneAndUpdate({ username: payloadByToken.username }, {
        username: newUsername,
        citizenship: newCitizenship
      })

      await currentUser.save()
      return res.json({message: 'User was successfuly updated'})
    } catch (e) {
      res.status(400).json({ message: 'User was successfuly updated' })
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (e) {
      return res.status(400).json({message: 'Failed to get users'})
    }
  }
}

module.exports = new userController()