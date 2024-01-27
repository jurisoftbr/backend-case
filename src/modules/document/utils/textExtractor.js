import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { extractRawText } from 'mammoth';

export const textExtractor = async (buffer, mimetype) => {
	switch (mimetype) {
		case 'application/pdf':
			return await pdfExtractor(buffer);
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			return await docxExtractor(buffer);
		default:
			break;
	}
};

const pdfExtractor = async (buffer) => {
	const content = await pdfParse(buffer);
	return content.text;
};

const docxExtractor = async (buffer) => {
	const content = await extractRawText({ buffer });
	return content.value;
};
