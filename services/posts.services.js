const PostsRepository = require('../repositories/posts.repository')
const CustomError = require('../middlewares/errorhandler')
const dayjs = require('dayjs')

class PostService {
    postRepository = new PostsRepository()


    checkPost = async ({ title, content }) => {
        console.log('바밤바')

        if (!title || !content || title.length > 100) {
            throw new CustomError('데이터 형식이 올바르지 않습니다.',412)
        }
        console.log('checkPostsfsfas')
        return
    }

    createPost = async ({ title, nickname, img, content, userId }) => {
        try {
            const post = await this.postRepository.createPost({ title, nickname, img, content, userId })
            console.log('createdP',post)
            // post = post.toJSON()
            console.log('createdP B',post)
            // Date 객체를 현제 시스템 로케일로
            const isUpdate = post.createdAt.toLocaleString() == post.updatedAt.toLocaleString() ? false : true
            console.log(isUpdate)
            const createdAt = dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')
            console.log('createdAt', createdAt)
            const updatedAt = dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            return ({ message: "게시글 작성 완료", 'post': { ...post, createdAt, updatedAt }, isUpdate })
        } catch (err) {

            throw new CustomError('게시글 작성에 실패하였습니다.', 400)
        }
    }
}
module.exports = PostService