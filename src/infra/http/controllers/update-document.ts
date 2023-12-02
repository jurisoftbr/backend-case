import { DocumentsMapper } from '@/core/mappers/documents';
import { LawyerNotFoundError } from '@/domain/documents/errors/lawyer-not-found';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const updateDocumentsParamsSchema = z.object({
  documentId: z.string(),
  lawyerId: z.string(),
});

const updateDocumentsBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
});

@injectable()
export class UpdateDocumentController {
  constructor(
    @inject('UpdateDocumentUseCase')
    private updateDocumentUseCase: UpdateDocumentUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { documentId, lawyerId } = updateDocumentsParamsSchema.parse(
      request.params
    );
    const { title, description, fileUrl } = updateDocumentsBodySchema.parse(
      request.body
    );

    try {
      const { document } = await this.updateDocumentUseCase.execute({
        id: documentId,
        title,
        description,
        fileUrl,
        lawyerId,
      });

      const parsedDocument = DocumentsMapper.toObject(document);

      return response.json(parsedDocument);
    } catch (error) {
      if (error instanceof LawyerNotFoundError) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal error' });
    }
  }
}
