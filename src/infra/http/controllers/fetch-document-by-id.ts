import { DocumentsMapper } from '@/core/mappers/documents';
import { DocumentNotFoundError } from '@/domain/documents/errors/document-not-found';
import { DocumentOwnerError } from '@/domain/documents/errors/document-owner';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { FetchDocumentByIdUseCase } from '@/domain/documents/use-cases/fetch-document-by-id';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const fetchDocumentByIdParamsSchema = z.object({
  documentId: z.string(),
  lawyerId: z.string(),
});

@injectable()
export class FetchDocumentByIdController {
  constructor(
    @inject('FetchDocumentByIdUseCase')
    private fetchDocumentByIdUseCase: FetchDocumentByIdUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { documentId, lawyerId } = fetchDocumentByIdParamsSchema.parse(
      request.params
    );

    try {
      const { document } = await this.fetchDocumentByIdUseCase.execute({
        documentId,
        lawyerId,
      });

      const parsedDocument = DocumentsMapper.toObject(document);

      return response.json(parsedDocument);
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
