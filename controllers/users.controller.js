const UserService = require('../services/users.services')
class UserController {
    constructor() {
        this.userService = new UserService
    }

}
module.exports = UserController