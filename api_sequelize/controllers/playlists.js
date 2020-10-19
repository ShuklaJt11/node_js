const models = require('./../models')
const Sequelize = models.Sequelize
const Playlist = models.playlist
const {Op} = Sequelize

exports.get_all_playlists = (req, res) => {
  let filter = {}
  const {q} = req.query
  
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`
        }
      }
    }
  }

  Playlist.findAll(filter).then(playlists => {
    if (playlists.length > 0) {
      res.json(playlists)
    } else {
      res.status(404).send('No song found.')
    }
  })
}

exports.create_playlist = (req, res) => {
  const {name} = req.body
  Playlist.create({
    name: name
  }).then(playlist => {
    res.json(playlist)
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

exports.get_one_playlist = (req, res) => {
  const {id} = req.params

  Playlist.findByPk(id).then(playlist => {
    if (playlist) {
      res.json(playlist)
    } else {
      res.status(404).send('Song not found.')
    }
  })
}