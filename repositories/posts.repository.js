const { Posts,Users,Sequelize } = require('../models')

class PostsRepository{
    updatePost = async({title,img,content,postId})=>{
        await Posts.update({
            title,
            img,
            content,
        }, {
            where: { postId },
            // returning: true
        })

        const post = await Posts.findOne({
            raw: true,
            where: { postId }
        })

        return post
    }
    findAll = async () =>{
        let posts = await Posts.findAll({
            raw: true,
            attributes: [
                'postId', 
                'title',
                'content',
                [Sequelize.fn('date_format',
                Sequelize.col('Posts.createdAt'), 
                '%Y-%m-%d %H:%i:%s'), 'createdAt'], 
                'img', 
                'User.nickname', 
                'userId'],
            include: [
                {
                    model: Users,
                    attributes: []
                }
            ],
            order: [['createdAt', 'DESC']],
        })
        return posts
    }
    findById = async({postId}) => {
        const post = await Posts.findOne({
            raw: true,
            where: { postId },
            attributes: ['postId', 'title', 'content', 'img', 'createdAt', 'updatedAt', 'User.nickname', 'userId'],
            include: [
                {
                    model: Users,
                    attributes: []
                }
            ]
        })
        return post
    }

    createPost = async ({title,nickname,img,content,userId}) =>{
        const post = await Posts.create({title,nickname,img,content,userId})
        return post.dataValues
    }
    
}

module.exports = PostsRepository