import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { DocumentOwnerError } from '@/domain/documents/errors/document-owner';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const deleteDocumentParamsSchema = z.object({
  documentId: z.string(),
  lawyerId: z.string(),
});

@injectable()
export class DeleteDocumentController {
  constructor(
    @inject('DeleteDocumentUseCase')
    private deleteDocumentUseCase: DeleteDocumentUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { documentId, lawyerId } = deleteDocumentParamsSchema.parse(
      request.params
    );

    try {
      await this.deleteDocumentUseCase.execute({
        documentId,
        lawyerId,
      });

      return response.status(202).end();
    } catch (error) {
      if (
        error instanceof LawyerNotFoundError ||
        error instanceof DocumentNotFoundError
      ) {
        return response.status(404).json({ message: error.message });
      }

      if (error instanceof DocumentOwnerError) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal error' });
    }
  }
}
