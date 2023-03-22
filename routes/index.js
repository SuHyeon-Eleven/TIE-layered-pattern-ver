const express = require('express')
const router = express.Router()
const authRouter = require('./auth.routes')
const postsRouter = require('./posts.routes')
const commentsRouter = require('./comments.routes')

router.use('/',authRouter)
router.use('/posts',postsRouter)
router.use('/posts',commentsRouter)

module.exports = router
