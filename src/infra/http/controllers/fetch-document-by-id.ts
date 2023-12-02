import { DocumentsMapper } from '@/core/mappers/documents';
import { FetchDocumentByIdUseCase } from '@/domain/documents/use-cases/fetch-document-by-id';
import { NextFunction, Request, Response } from 'express';
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

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId, lawyerId } = fetchDocumentByIdParamsSchema.parse(
        request.params
      );

      const { document } = await this.fetchDocumentByIdUseCase.execute({
        documentId,
        lawyerId,
      });

      const parsedDocument = DocumentsMapper.toObject(document);

      return response.json(parsedDocument);
    } catch (error) {
      next(error);
    }
  }
}
