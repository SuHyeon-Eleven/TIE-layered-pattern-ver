const { Posts } = require('../models');

module.exports = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    console.log('userId', userId);
    const existPost = await Posts.findOne({ where: { postId } });
    console.log(existPost.userId == userId);
    if (existPost.userId == userId) {
        console.log('왜 안넘어감?');
        next();
        console.log('after next');
        console.log('user Validation try end');
    } else {
        res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
    }
};
