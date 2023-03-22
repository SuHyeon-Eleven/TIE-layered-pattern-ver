const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users.controller')
const userController = new UserController

router.post('/signup', userController.signUpUser)
router.post('/signup/check', userController.duplicatedId)
router.post('/login',userController.loginUser)

module.exports = router