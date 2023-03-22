const express = require('express')
const router = express.Router()
const authmiddleware = require('../middlewares/auth-middleware')
const upload = require('../middlewares/multerMiddleware')
const fs = require('fs').promises

const PostsController = require('../controllers/posts.controller')
const postController = new PostsController

// router.get('/',postsController.getPost)
// router.get('/',postsController.getPostAll)
router.post('/',authmiddleware,upload.single('img'),postController.createPost)
router.patch('/:postId',authmiddleware,postController.patchPost)
router.delete('/:postId',authmiddleware,postController.deletePost)

module.exports = router