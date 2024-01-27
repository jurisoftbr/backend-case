import { DocumentModel } from '../../../schemas/document.js';
import { textExtractor } from '../utils/textExtractor.js';
import { v4 } from 'uuid';

export const upload = async ({ buffer, mimetype, userId, originalname }) => {
	const content = await textExtractor(buffer, mimetype);

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
