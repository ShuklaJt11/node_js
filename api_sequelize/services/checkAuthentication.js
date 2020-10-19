const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

module.exports = (req, res, next) => {
  const {token} = req.headers
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed'
    })
  }
}