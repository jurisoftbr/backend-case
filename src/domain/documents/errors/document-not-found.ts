export class DocumentNotFoundError extends Error {
  constructor(documentId: string) {
    super(`Document with id ${documentId} was not found`);
  }
}
