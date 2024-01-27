import { Router } from 'express';
import multer from 'multer';
import { upload } from './services/upload.js';
import { keywordsExtractor } from './utils/keywordsExtractor.js';

export const DocumentController = new Router();

const storage = multer.memoryStorage();
const uploadMulter = multer({ storage: storage });

DocumentController.post('/upload', uploadMulter.single('file'), async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No files were uploaded.');
	}

	const { buffer, mimetype, originalname } = req.file;
	const uploadedFile = await upload({ buffer, mimetype, originalname, userId: req.user.id });

	// extract keywords syncronously, but require a log to guarantee that the keywords will be extracted
	// for development case, I will not use a log, but in production case will be necessary
	keywordsExtractor(uploadedFile);

	return res.status(201).send('File uploaded successfully.');
});
