import { NotFoundError } from '@/core/errors/not-found';

export class DocumentNotFoundError extends NotFoundError {
  constructor(documentId: string) {
    super(`Document with id ${documentId} was not found`);
  }
}
