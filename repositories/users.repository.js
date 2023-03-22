const { Users } = require('../models')

class userRepository{
    createUser = async ({userId, nickname, hashedPw}) =>{
        console.log('repo',hashedPw)
        const user = await new Users({ userId, nickname, password:hashedPw })
        await user.save()
        console.log('repo user', user)
        return ({ user })
    }

    findById = async ({userId})=> {
        const existUsers  = await Users.findOne({
            where : {userId}
        })
        console.log('user repo existUser',existUsers)
        return existUsers
    }
}
module.exports = userRepository