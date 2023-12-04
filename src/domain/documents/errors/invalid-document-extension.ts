import { UnprocessableEntityError } from '@/core/errors/unprocessable-entity';

export class InvalidDocumentExtension extends UnprocessableEntityError {
  constructor(fileName: string) {
    super(`The file ${fileName} extension is invalid`);
  }
}
