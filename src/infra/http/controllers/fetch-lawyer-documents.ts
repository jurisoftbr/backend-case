import { DocumentsMapper } from '@/core/mappers/documents';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const fetchLawyerDocumentsParamsSchema = z.object({
  lawyerId: z.string(),
});

@injectable()
export class FetchLawyerDocumentsController {
  constructor(
    @inject('FetchLawyerDocumentsUseCase')
    private fetchLawyerDocumentsUseCase: FetchLawyerDocumentsUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { lawyerId } = fetchLawyerDocumentsParamsSchema.parse(
        request.params
      );

      const { documents } = await this.fetchLawyerDocumentsUseCase.execute({
        lawyerId,
      });

      const parsedDocuments = documents.map((document) =>
        DocumentsMapper.toObject(document)
      );

      return response.json(parsedDocuments);
    } catch (error) {
      next(error);
    }
  }
}
