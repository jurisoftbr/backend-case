import { DocumentModel } from '../../../schemas/document.js';
import { textExtractor } from '../utils/textExtractor.js';

export const updateDocument = async ({ buffer, mimetype, userId, originalname, documentId }) => {
  const content = await textExtractor(buffer, mimetype);

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
