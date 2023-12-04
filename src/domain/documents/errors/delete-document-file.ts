export class DeleteDocumentFileError extends Error {
  constructor() {
    super('Was not possible to delete document file');
  }
}
