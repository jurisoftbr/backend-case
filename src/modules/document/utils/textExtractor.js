import pdfParse from 'pdf-parse';

export const textExtractor = async (buffer, mimetype) => {
	switch (mimetype) {
		case 'application/pdf':
			return await pdfExtractor(buffer);
		case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			return buffer;
		default:
			break;
	}
};

const pdfExtractor = async (buffer) => {
	const content = await pdfParse(buffer);
	return content.text;
};
