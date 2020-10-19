const express = require('express')
const jwtAuthentication = require('./../services/checkAuthentication')
const playlistController = require('./../controllers/playlists')

const router = express.Router()

router.get('/', playlistController.get_all_playlists)

router.post('/', jwtAuthentication, playlistController.create_playlist)

router.get('/:id', playlistController.get_one_playlist)

module.exports = router