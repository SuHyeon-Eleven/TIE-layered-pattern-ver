const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth-middleware');
const upload = require('../middlewares/multerMiddleware');
const fs = require('fs').promises;
const userValidation = require('../middlewares/userValidation');
const PostsController = require('../controllers/posts.controller');
const postController = new PostsController();

router.get('/:postId', postController.getPost);
router.get('/', postController.getPostAll);
router.post(
    '/',
    authmiddleware,
    upload.single('img'),
    postController.createPost
);
router.patch(
    '/:postId',
    authmiddleware,
    userValidation,
    upload.single('img'),
    postController.updatePost
);
router.delete(
    '/:postId',
    authmiddleware,
    userValidation,
    postController.deletePost
);

module.exports = router;
