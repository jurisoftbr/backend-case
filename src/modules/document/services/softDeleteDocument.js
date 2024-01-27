import { badRequest } from "@hapi/boom";
import { DocumentModel } from "../../../schemas/document.js";

export const softDeleteDocument = async (documentId) => {
  const document = await DocumentModel.findOne({ id: documentId });

  if (!document) {
    throw badRequest("Document not found");
  }

  await document.update({ deletedAt: new Date() });
}