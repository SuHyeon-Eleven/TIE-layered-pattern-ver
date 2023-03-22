const { Posts } = require('../models')

module.exports =  async (req, res, next) => {
    const { postId } = req.params
    const { userId } = res.locals.user
    const existPost = await Posts.findOne({ where: { postId } })
    existPost.userId == userId ? next() : res.status(403).json({ errorMessage: "게시글의 수정 권한이 존재하지 않습니다." })
}