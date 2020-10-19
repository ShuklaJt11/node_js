const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')
const {User} = require('./../models')
const HASH_SALT = process.env.HASH_SALT
const SECRET_KEY = process.env.SECRET_KEY

exports.create_user = (req, res) => {
  const {username, password} = req.body
  console.log(HASH_SALT)
  
  User.findOne({ where: { username: username }})
    .then(existingUser => {
      if (existingUser) {
        res.status(409).json({
          message: 'Username already exists'
        })
      } else {
        bcrypt.hash(password, parseInt(HASH_SALT), (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err.message
            })
          } else {
            User.create({
              publicId: uuidv4(),
              username: username,
              password: hash
            }).then(user => {
              res.json(user)
            }, errors => {
              res.status(422).json({
                errors: errors.errors.map(error => {
                  return {
                    attribute: error.path,
                    message: error.message
                  }
                })
              })
            })
          }
        })
      }
    })
}

exports.get_all_users = (req, res) => {
  User.findAll().then(users => {
    if (users.length > 0) {
      res.json(users)
    } else {
      res.status(404).send('No user found.')
    }
  })
}

exports.login = (req, res) => {
  const {username, password} = req.body

  User.findOne({ where: { username: username }})
    .then(existingUser => {
      if (existingUser) {
        bcrypt.compare(password, existingUser.password, (error, result) => {
          if (error) {
            res.status(401).json({
              message: 'Authentication failed'
            })
          }
          if (result) {
            const token = jwt.sign(
              {
                publicId: existingUser.publicId,
                username: existingUser.username
              },
              SECRET_KEY,
              {
                expiresIn: "30 days"
              }
            )
            return res.status(200).json({
              message: 'Authentication successful',
              token: token
            })
          }
          res.status(401).json({
            message: 'Authentication failed'
          })
        })
      } else {
        res.status(401).json({
          message: 'Authentication failed'
        })
      }
    })
}

exports.delete_user = (req, res) => {
  const {publicId} = req.params

  User.findOne({ where: { publicId: publicId }})
    .then(user => {
      if (user) {
        user.destroy()
          .then(() => {
            res.status(200).json({
              message: "User deleted"
            })
          })
          .catch(err => {
            res.status(500).json({
              error: err.message
            })
          })
      } else {
        res.status(404).json({
          message: 'No such user found'
        })
      }
    })
}