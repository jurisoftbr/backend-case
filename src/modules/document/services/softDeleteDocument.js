import { badRequest } from '@hapi/boom';
import { DocumentModel } from '../../../schemas/document.js';

export const softDeleteDocument = async (documentId) => {
	const document = await DocumentModel.findOneAndUpdate({ id: documentId }).set({
		deletedAt: new Date(),
	});

	if (!document) {
		throw badRequest('Document not found');
	}
};
