const PostService = require('../services/posts.services')
class PostsController {
    constructor() {
        this.postService = new PostService
    }
}
module.exports = PostsController