import natural from 'natural';
import { DocumentModel } from '../../../schemas/document.js';

const tokenizer = new natural.AggressiveTokenizerPt();

export const keywordsExtractor = async (uploadedFile) => {
	const tokens = tokenizer.tokenize(uploadedFile.content);
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
		if (frequency[key] > 2 && key.length > 4) {
			keywords.push(key);
		}
	}

	await DocumentModel.updateOne({ _id: uploadedFile._id }, { keywords });
};
