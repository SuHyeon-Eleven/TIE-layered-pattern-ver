const express = require('express')
const router = express.Router()
const CommentsController = require('../controllers/comments.controller')
const commentsControlelr = new CommentsController

module.exports = router