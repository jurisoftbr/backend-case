import { DocumentsMapper } from '@/core/mappers/documents';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { inject, injectable } from 'tsyringe';
import { requestUserSchema } from '../../schemas/request-user';

@injectable()
export class FetchLawyerDocumentsController {
  constructor(
    @inject(FetchLawyerDocumentsUseCase)
    private fetchLawyerDocumentsUseCase: FetchLawyerDocumentsUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: lawyerId } = requestUserSchema.parse(request.user);

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
