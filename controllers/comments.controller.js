const CommentsService = require('../services/comments.services');
class CommentsController {
    constructor() {
        this.commentsService = new CommentsService();
    }
    createComment = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { comment } = req.body;
            const { userId } = res.locals.user;

            const result = await this.commentsService.createComment({ postId, comment, userId })
            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    getAllComments = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const comments = await this.commentsService.getAllComments({ postId })
            res.status(200).json(comments)
        } catch (err) {
            next(err)
        }
    }
    deleteComment = async (req, rex, next) => {
        try {
            const { postId, commentId } = req.params;
            const { userId } = res.locals.user; // 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 삭제 가능
            const result = await this.commentsService.deleteComment({ postId, commentId, userId })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = CommentsController;
