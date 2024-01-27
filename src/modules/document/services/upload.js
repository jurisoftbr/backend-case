import { DocumentModel } from '../../../schemas/document';
import { textExtractor } from '../utils/textExtractor';

export const upload = async ({ buffer, mimetype, userId }) => {
	const content = textExtractor(buffer, mimetype);

	const document = new DocumentModel({
		content,
		file: {
			data: buffer,
			contentType: mimetype,
			originalName: title,
		},
	});

	document.versions.push({
		content,
		modifiedBy: userId,
	});

	return await document.save();
};
