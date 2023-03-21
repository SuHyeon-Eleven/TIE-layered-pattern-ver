const CommentsService = require('../services/comments.services')
class CommentsController {
    constructor() {
        this.commentsService = new CommentsService
    }
}
module.exports = CommentsController
