import { DocumentHistoriesMapper } from '@/core/mappers/document-histories';
import { FetchDocumentHistoryUseCase } from '@/domain/documents/use-cases/fetch-document-history';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const fetchDocumentHistoryParamsSchema = z.object({
  documentId: z.string(),
});

@injectable()
export class FetchDocumentHistoryController {
  constructor(
    @inject(FetchDocumentHistoryUseCase)
    private fetchDocumentHistoryUseCase: FetchDocumentHistoryUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId } = fetchDocumentHistoryParamsSchema.parse(
        request.params
      );

      const { documentHistory } =
        await this.fetchDocumentHistoryUseCase.execute({ documentId });

      const parsedDocumentHistory = documentHistory.map((history) =>
        DocumentHistoriesMapper.toObject(history)
      );

      return response.json({ history: parsedDocumentHistory });
    } catch (error) {
      next(error);
    }
  }
}