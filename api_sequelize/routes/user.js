const express = require('express')
const userController = require('./../controllers/user')
const jwtAuthentication = require('./../services/checkAuthentication')
const router = express.Router()

router.post('/create', userController.create_user)

router.get('/list', jwtAuthentication, userController.get_all_users)

router.post('/login', userController.login)

router.delete('/:publicId', userController.delete_user)

module.exports = router