const { Posts } = require('../models')

class PostsRepository{
    createPost = async ({title,nickname,img,content,userId}) =>{
        const post = await Posts.create({title,nickname,img,content,userId})
        return post.dataValues
    }
    
}

module.exports = PostsRepository