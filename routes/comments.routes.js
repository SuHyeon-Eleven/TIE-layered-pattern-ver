const express = require('express');
const router = express.Router();
const CommentsController = require('../controllers/comments.controller');
const authMiddlewre = require('../middlewares/auth-middleware')
const commentsController = new CommentsController();
router.post('/:postId/comments', authMiddlewre ,commentsController.createComment)
router.get('/:postId/comments', authMiddlewre, commentsController.getAllComments)
router.delete('/:postId/comments/:commentId',authMiddlewre, commentsController.deleteComment)
module.exports = router;
