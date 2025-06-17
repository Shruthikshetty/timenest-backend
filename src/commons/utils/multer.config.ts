import multer from 'multer';
import path from 'path';

// Multer configuration
const upload = multer({
  dest: path.join(__dirname, '../uploads/'),
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
});

export default upload;
