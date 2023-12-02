export class DocumentOwnerError extends Error {
  constructor(documentId: string, lawyerId: string) {
    super(
      `The lawyer with id ${lawyerId} is not the document with id ${documentId} owner`
    );
  }
}
