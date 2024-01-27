import { Router } from 'express';
import multer from 'multer';
import { upload } from './services/upload.js';
import { ensureAuth } from '../auth/middlewares/ensureAuth.js';

export const DocumentController = new Router();

const storage = multer.memoryStorage();
const uploadMulter = multer({ storage: storage });

DocumentController.post('/upload', ensureAuth.Authenticated, uploadMulter.single('file'), async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No files were uploaded.');
	}

	const { buffer, mimetype, originalname } = req.file;
	await upload({ buffer, mimetype, originalname, userId: req.user.id });

	return res.status(201).send('File uploaded successfully.');
});
