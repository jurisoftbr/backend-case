import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { extractRawText } from 'mammoth';
import { recognize } from 'node-tesseract-ocr';
import { badRequest } from '@hapi/boom';

export const contentExtractor = async (buffer, mimetype) => {
	switch (mimetype) {
		case 'application/pdf':
			return await pdfExtractor(buffer);
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			return await docxExtractor(buffer);
		case 'image/png':
		case 'image/jpeg':
		case 'image/jpg':
			return await imageExtractor(buffer);
		default:
			throw badRequest('File type not supported. Only support PDF, DOCX, PNG, JPG and JPEG.');
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

const imageExtractor = async (buffer) => {
	const content = await recognize(buffer, {
		lang: 'eng',
		oem: 1,
		psm: 3,
	});

	return content;
};
