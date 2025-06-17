import multer from 'multer';
import path from 'path';

// Multer configuration
const upload = multer({
  dest: path.join(__dirname, '../uploads/'),
  limits: { fileSize: 1000000 }, // 1MB
});

export default upload;
