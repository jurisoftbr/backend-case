import { UnprocessableEntityError } from '@/core/errors/unprocessable-entity';

export class DeleteDocumentFileError extends UnprocessableEntityError {
  constructor() {
    super('Was not possible to delete document file');
  }
}
