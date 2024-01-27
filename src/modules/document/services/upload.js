import { DocumentModel } from '../../../schemas/document.js';
import { textExtractor } from '../utils/textExtractor.js';

export const upload = async ({ buffer, mimetype, userId, originalname }) => {
	const content = await textExtractor(buffer, mimetype);

	const document = new DocumentModel({
		content,
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

	return await document.save();
};
