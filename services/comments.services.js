const CommentsRepository = require('../repositories/comments.repository');
const PostsRepository = require('../repositories/posts.repository');
const CustomError = require('../middlewares/errorhandler')
class CommentsService {
    commentRepository = new CommentsRepository
    postRepository = new PostsRepository
    deleteComment = async ({postId,commentId,userId})=>{
        const post = await this.postRepository.findById({postId})
        if (!post) {
            throw new CustomError( "게시글이 존재하지 않습니다.",404)
        }
        
        const existComment = await this.commentRepository.findById({  commentId  });

        if (!existComment) {
            throw new CustomError( "댓글이 존재하지 않습니다.",404)
        }

        if (existComment.userId !== userId)  {
            throw new CustomError( "댓글 삭제의 권한이 존재하지 않습니다.",403)
        }

        await this.commentRepository.deleteComment({commentId})
        return { message: "댓글을 삭제하였습니다." }
        
        
    }
    getAllComments = async({postId}) => {
        const allComments = await this.commentRepository.findAllComments({postId})
        
        
        return ({ comments});
    }
    createComment = async ({postId, comment, userId})=>{
         // 게시글 존재 확인
        
        const post = await postRepository.findById({postId})

        if (!post) {
            throw new CustomError("게시글이 존재하지 않습니다",400)
        }
        // 댓글 미입력
        if (!comment) {
            throw new CustomError("댓글 내용의 형식이 일치하지 않습니다.",412)
            
        }

        // 댓글 생성
        const createComment = await this.commentRepository.createComment({
            postId: postId,
            userId: userId,
            comment : comment,
        });

        const formattedCreatedAt = dayjs(createComment.createdAt).format('YYYY-MM-DD HH:mm:ss');
        const formattedUpdatedAt = dayjs(createComment.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        const formattedComment = {
            ...createComment.toJSON(),
            createdAt: formattedCreatedAt,
            updatedAt: formattedUpdatedAt
        };

        return { createComment: formattedComment, message: "댓글 작성에 성공하였습니다." }
    }

}
module.exports = CommentsService;
