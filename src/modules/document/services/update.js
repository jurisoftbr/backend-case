import { DocumentModel } from '../../../schemas/document.js';
import { contentExtractor } from '../utils/contentExtractor.js';

export const update = async ({ buffer, mimetype, userId, originalname, documentId }) => {
	const content = await contentExtractor(buffer, mimetype);

	const document = await DocumentModel.findOneAndUpdate({ id: documentId }).set({
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

	await document.save();
};
