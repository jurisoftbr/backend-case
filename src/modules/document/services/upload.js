import { DocumentModel } from '../../../schemas/document.js';
import { contentExtractor } from '../utils/contentExtractor.js';
import { v4 } from 'uuid';

export const upload = async ({ buffer, mimetype, userId, originalname }) => {
	const content = await contentExtractor(buffer, mimetype);

	const document = new DocumentModel({
		content,
		id: v4(),
		file: {
			data: buffer,
			contentType: mimetype,
			originalName: originalname,
		},
	});

	document.versions.push({
		content,
		modifiedBy: userId,
	});

	const saveDocument = await document.save();

	return saveDocument;
};
