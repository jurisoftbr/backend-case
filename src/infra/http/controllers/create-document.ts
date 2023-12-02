import { DocumentsMapper } from '@/core/mappers/documents';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { CreateDocumentUseCase } from '@/domain/documents/use-cases/create-document';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const createDocumentsParamsSchema = z.object({
  lawyerId: z.string(),
});

const createDocumentsBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
});

@injectable()
export class CreateDocumentController {
  constructor(
    @inject('CreateDocumentUseCase')
    private createDocumentUseCase: CreateDocumentUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { lawyerId } = createDocumentsParamsSchema.parse(request.params);
    const { title, description, fileUrl } = createDocumentsBodySchema.parse(
      request.body
    );

    try {
      const { document } = await this.createDocumentUseCase.execute({
        title,
        description,
        fileUrl,
        lawyerId,
      });

      const parsedDocument = DocumentsMapper.toObject(document);

      return response.status(201).json(parsedDocument);
    } catch (error) {
      if (error instanceof LawyerNotFoundError) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal error' });
    }
  }
}
