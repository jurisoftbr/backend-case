import { Router } from 'express';
import multer from 'multer';
import { upload } from './services/upload.js';

export const DocumentController = new Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

DocumentController.get('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }

    const { buffer, mimetype, originalname } = req.file;
    await upload({ buffer, mimetype, title: originalname, userId: req.user.id });

    return res.status(201).send('File uploaded successfully.')
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong to upload the file.');
  }
});
