const PostsRepository = require('../repositories/posts.repository')
const CustomError = require('../middlewares/errorhandler')
const dayjs = require('dayjs')

class PostService {
    postRepository = new PostsRepository()
    findPostAll = async ()=>{
        const posts = await this.postRepository.findAll()

        return(posts)
    }
    findPostOne = async ({postId}) => {
        const post = await this.postRepository.findById({postId})
        console.log(post)
        if (!post) {
            throw new CustomError('게시글이 존재하지 않습니다.',404)
        }

        const isUpdate = post.createdAt.toLocaleString() == post.updatedAt.toLocaleString() ? false : true
        const createdAt = dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')
        const updatedAt = dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss')

        return ({ 'post':{...post ,createdAt,updatedAt}, isUpdate })

    
    }

    checkPost = async ({ title, content }) => {

        if (!title || !content || title.length > 100) {
            throw new CustomError('데이터 형식이 올바르지 않습니다.',412)
        }
        console.log('checkPostsfsfas')
        return
    }

    createPost = async ({ title, nickname, img, content, userId }) => {
        try {
            const post = await this.postRepository.createPost({ title, nickname, img, content, userId })
            // Date 객체를 현제 시스템 로케일로
            const isUpdate = post.createdAt.toLocaleString() == post.updatedAt.toLocaleString() ? false : true
            const createdAt = dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')
            const updatedAt = dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            return ({ message: "게시글 작성 완료", 'post': { ...post, createdAt, updatedAt }, isUpdate })
        } catch (err) {
            throw new CustomError('게시글 작성에 실패하였습니다.', 400)
        }
    }
}
module.exports = PostService