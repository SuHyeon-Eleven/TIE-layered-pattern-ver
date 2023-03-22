const UserService = require('../services/users.services')
class UserController {
    constructor() {
        this.userService = new UserService()
    }
    signUpUser = async (req, res, next) => {
        try {
            const { userId, nickname, password, confirm } = req.body
            const result = await this.userService.signupUser({
                userId, nickname, password, confirm
            })
            console.log(result)
            res.json(result)

        } catch (err) {
            // res.status(err.status).json({ errMessage: err.message })
            next(err)
        }
    }
    duplicatedId = async (req, res, next) => {
        try {
            const { userId } = req.body
            const result = await this.userService.findById({
                userId
            })
            res.json(result)
        } catch (err) {
            // res.status(err.status).json({ errMessage: err.message })
            next(err)
        }
    }
    loginUser = async (req, res, next) => {
        try {
            const { userId, password } = req.body
            const result = await this.userService.loginUser({ userId, password })
            console.log(result)
            const {token} = result
            
            res.cookie('authorization', `Bearer ${token}`, {
                httpOnly: false,
                sameSite: false,
            })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
}
module.exports = UserController