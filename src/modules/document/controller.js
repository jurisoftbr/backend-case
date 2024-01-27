import { Router } from 'express';
import multer from 'multer';
import { upload } from './services/upload.js';
import { keywordsExtractor } from './utils/keywordsExtractor.js';
import { GetDocumentsQuerySchema } from './validators/document.js';
import { getDocuments } from './services/getDocuments.js';
import { badRequest } from '@hapi/boom';

export const DocumentController = new Router();

const storage = multer.memoryStorage();
const uploadMulter = multer({ storage: storage });

DocumentController.post('/upload', uploadMulter.single('file'), async (req, res) => {
	if (!req.file) {
		throw badRequest('File is required.');
	}

	const { buffer, mimetype, originalname } = req.file;
	const uploadedFile = await upload({ buffer, mimetype, originalname, userId: req.user.id });

	// extract keywords syncronously, but require a log to guarantee that the keywords will be extracted
	// for development case, I will not use a log, but in production case will be necessary
	keywordsExtractor(uploadedFile);

	return res.status(201).send('File uploaded successfully.');
});

DocumentController.get('/', async (req, res) => {
	const validateQuery = GetDocumentsQuerySchema.safeParse(req.query);

	if (!validateQuery.success) {
		throw badRequest('Invalid query parameters.');
	}

	const documents = await getDocuments(validateQuery.data);

	return res.status(200).send(documents);
});
