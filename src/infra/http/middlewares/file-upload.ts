import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { InvalidDocumentExtension } from '@/domain/documents/errors/invalid-document-extension';

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const uploadPath = path.join(__dirname, '../../../../uploads');
    fs.mkdirSync(uploadPath, { recursive: true });
    callback(null, uploadPath);
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const fileFilter = (request, file, callback) => {
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const fileMimeType = mime.lookup(file.originalname);

  if (fileMimeType && allowedMimeTypes.includes(fileMimeType)) {
    callback(null, true);
  } else {
    callback(new InvalidDocumentExtension(file.originalname), false);
  }
};

export const fileUpload = multer({ storage, fileFilter });
