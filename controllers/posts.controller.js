const CustomError = require('../middlewares/errorhandler')
const PostService = require('../services/posts.services')
const multer = require('multer')

class PostsController {
    constructor() {
        this.postService = new PostService()
    }

    getPostAll = async (req,res, next)=>{
        try{
            const post = await this.postService.findPostAll()
            res.status(200).json(post)
        }catch(err){
            next(err)
        }
    }

    getPost = async (req,res,next)=>{
        try{
            const { postId } = req.params
            const post = await this.postService.findPostOne({postId})

            res.status(200).json(post)
        }catch(err){
            next(err)
        }
    }
    createPost = async (req, res, next) => {
        try {
            if (req.err) {
                throw new CustomError(req.err, 400)
            }
            console.log('req.file', req.file)
            const { title, content } = req.body
            const user = res.locals.user
            console.log(title, content)
            console.log(user)
            await this.postService.checkPost({title,content})
            // 이미지가 있으면 파일경로, 없으면 false 반환
            const img = !req.file ? 'false' : `/images/${req.file.filename}`

            let post = await this.postService.createPost({
                title,
                nickname: user.nickname,
                img: img,
                content,
                userId: user.userId
            })

            res.status(200).json(post)
        } catch (err) {
            console.log(err)
            if (err instanceof multer.MulterError) {
                throw new CustomError('이미지 파일만 업로드 할 수 있습니다',400)
                // res.status(400).json({ errorMessage: "이미지 파일만 업로드 할 수 있습니다." })
            } 
            // else if(err.expect !== true) {
            //     throw new CustomError('게시글 작성에 실패하였습니다',400)
            //     // res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." })
            // }
            console.log("next()")
            next(err)
        }
    }
    patchPost = async (req, res, next) => {

    }
    deletePost = async (req, res, next) => {

    }
}
module.exports = PostsController