import natural from 'natural';
import { DocumentModel } from '../../../schemas/document.js';

const tokenizer = new natural.AggressiveTokenizerPt();

export const keywordsExtractor = async (uploadedFile) => {
	const cleanedDocument = uploadedFile.content.replace(/\n/g, ' ');

	const tokens = tokenizer.tokenize(cleanedDocument);
	const frequency = {};
	const keywords = [];

	for (const token of tokens) {
		if (frequency[token]) {
			frequency[token]++;
		} else {
			frequency[token] = 1;
		}
	}

	const frequencyKeys = Object.keys(frequency);

	for (const key of frequencyKeys) {
		if (frequency[key] > 1) {
			keywords.push(key);
		}
	}

	await DocumentModel.updateOne({ _id: uploadedFile._id }, { keywords });
};
