const { Comments } = require('../models');

class CommentsRepository {
    deleteComment = async ({commentId})=>{
        await Comments.destroy(
            { where: { commentId } }
        );
        return
    }
    findById = async({commentId})=>{
        const existComment = await Comments.findOne({ where: { commentId } });
        return existComment
    }
    findAllComments = async ({postId}) => {
        const comments = await Comments.findAll({
            attributes: [
                "commentId", 
                "userId", 
                "comment",
                // createdAt 컬럼을 date_format 함수로 변경하여 KST 시간대로 변환하여 조회
                // as 키워드를 사용하여 변경된 컬럼 이름을 createdAt으로 설정함.
                [Sequelize.fn('date_format', Sequelize.fn(Sequelize.col('Comments.createdAt')), '%Y-%m-%d %H:%i:%s'), 'createdAt'],
                "User.nickname",
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            where : [{ postId: postId }], 
            order: [['createdAt', 'DESC']],
            raw: true, // JSON 형태로 반환된 데이터를 처리
        })
        return comments
    }
    createComment = async ({postId,userId, comment})=>{
        createdComment = await Comments.create({
            postId: postId,
            userId: userId,
            comment : comment,
        });
        return createdComment
    }

}

module.exports = CommentsRepository;
