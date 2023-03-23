const UserRepository = require('../repositories/users.repository');
const CustomError = require('../middlewares/errorhandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    userRepository = new UserRepository();
    signupUser = async ({ userId, nickname, password, confirm }) => {
        let checkNickname = /^[a-zA-Z가-힣0-9]{2,10}$/;
        let checkPassword = /^[a-zA-Z0-9]{8,30}$/;

        // 비밀 번호와 정규식 비교
        if (!checkPassword.test(password)) {
            console.log(1);
            throw new CustomError('비밀번호 형식이 올바르지 않습니다.', 400);
        }
        if (!checkNickname.test(nickname)) {
            console.log(2);
            throw new CustomError('닉네임 형식이 올바르지 않습니다.', 400);
        }
        // 비밀번호와 확인비번이 다른경우
        if (password !== confirm) {
            throw new CustomError(
                '패스워드가 패스워드 확인란과 동일하지 않습니다.',
                400
            );
        }
        const hashedPw = bcrypt.hashSync(password, 10);
        console.log('sfasfas');
        console.log(hashedPw);
        try {
            await this.userRepository.createUser({
                userId,
                nickname,
                hashedPw,
            });
            return { message: '회원가입 성공' };
        } catch (err) {
            throw new CustomError(
                '요청한 데이터 형식이 올바르지 않습니다',
                400
            );
        }
    };

    findById = async ({ userId }) => {
        console.log('findById', userId);
        let checkuserId = /^[a-zA-Z0-9]{3,12}$/;

        if (userId.length === 0) {
            throw new CustomError('아이디를 입력해주세요', 400);
        }
        if (!checkuserId.test(userId)) {
            throw new CustomError('아이디 형식이 올바르지 않습니다.', 400);
        }
        const existUsers = await this.userRepository.findById({ userId });
        if (existUsers) {
            throw new CustomError('중복된 아이디가 존재합니다.', 400);
        }

        return {
            duplicationResult: false,
            message: '사용가능한 아이디 입니다.',
        };
    };

    loginUser = async ({ userId, password }) => {
        const user = await this.userRepository.findById({ userId });
        console.log(user);
        console.log('service');
        const match = bcrypt.compareSync(password, user.password);
        console.log(match);
        if (!user || !match) {
            throw new CustomError(
                '아이디와 비밀번호를 다시 확인해 주세요',
                400
            );
        }
        console.log('토큰 전 ');
        console.log(user.nickname);
        console.log(process.env.TOKEN_KEY);
        const token = jwt.sign(
            { nickname: user.nickname, userId: user.userId },
            process.env.TOKEN_KEY
        );
        console.log(token);

        return {
            token,
            success: true,
            message: '로그인에 성공했습니다.',
        };
    };
}
module.exports = UserService;
