const multer = require('multer');
const path = require('path');

// 디스크 스토리지 엔진 설정
const storage = multer.diskStorage({
    // 업로드된 파일이 저장될 경로 지정
    destination: function (req, file, cb) {
        // 오류가 없을때 'public/images/' 경로에 파일을 저장하도록 설정
        cb(null, 'public/images/');
    },
    // 업로드된 파일의 이름 지정
    filename: (req, file, cb) => {
        // 업로드된 파일의 확장자 추출
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/\s+/g, ''); // 파일 이름에서 공백 제거
        const timestamp = Date.now();
        const filename = `${name}-${timestamp}${ext}`;
        // 업로드된 파일의 이름에서 확장자를 제외한 부분과 현재 시간을 조합하여 새로운 파일 이름 생성
        cb(null, filename); // 에러가 없으면 최종적으로 사용될 filename 을 multer 에 알림
        // cb는 multer 에서 사용하는 콜백
        // cb(null, name + '-' + d.format('YY-MM-DD-HH-mm-ss') + ext)
    },
});

const imageFilter = (req, file, cb) => {
    // 이미지 파일인지 체크
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        // 이미지 파일이 아닌경우 파일을 업로드 하지 않음
        req.err = { errorMessage: '이미지 파일만 업로드 가능 합니다.' };
        return cb(null, false);

        // cb(null, false);
    }
    cb(null, true); // 에러가 없으면 업로드 될수 있음. (이미지 파일인경우 업로드)
};

// 설정한 스토리지 엔진을 사용하여 Multer 미들웨어를 생성
const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
});

module.exports = upload;
