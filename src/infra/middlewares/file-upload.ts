import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const uploadPath = path.join(__dirname, '../../../uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

export const fileUpload = multer({ storage });
