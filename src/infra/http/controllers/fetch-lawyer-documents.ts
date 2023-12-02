import { DocumentsMapper } from '@/core/mappers/documents';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { FetchLawyerDocumentsUseCase } from '@/domain/documents/use-cases/fetch-lawyer-documents';
import { Request, Response } from 'express';
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

  async handle(request: Request, response: Response) {
    const { lawyerId } = fetchLawyerDocumentsParamsSchema.parse(request.params);

    try {
      const { documents } = await this.fetchLawyerDocumentsUseCase.execute({
        lawyerId,
      });

      const parsedDocuments = documents.map((document) =>
        DocumentsMapper.toObject(document)
      );

      return response.json(parsedDocuments);
    } catch (error) {
      if (error instanceof LawyerNotFoundError) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal error' });
    }
  }
}