import { BadRequestError } from '@/core/errors/bad-request';

export class DocumentOwnerError extends BadRequestError {
  constructor(documentId: string, lawyerId: string) {
    super(
      `The lawyer with id ${lawyerId} is not the document with id ${documentId} owner`
    );
  }
}
