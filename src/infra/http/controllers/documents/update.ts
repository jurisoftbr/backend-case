import { DocumentsMapper } from '@/core/mappers/documents';
import { UpdateDocumentUseCase } from '@/domain/documents/use-cases/update-document';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import { requestUserSchema } from '../../schemas/request-user';

const updateDocumentsParamsSchema = z.object({
  documentId: z.string(),
});

const updateDocumentsBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
  keywords: z.array(z.string()),
});

@injectable()
export class UpdateDocumentController {
  constructor(
    @inject(UpdateDocumentUseCase)
    private updateDocumentUseCase: UpdateDocumentUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId } = updateDocumentsParamsSchema.parse(request.params);
      const { id: lawyerId } = requestUserSchema.parse(request.user);
      const { title, description, fileUrl, keywords } =
        updateDocumentsBodySchema.parse(request.body);

      const { document } = await this.updateDocumentUseCase.execute({
        id: documentId,
        title,
        description,
        fileUrl,
        keywords,
        lawyerId,
      });

      const parsedDocument = DocumentsMapper.toObject(document);

      return response.json(parsedDocument);
    } catch (error) {
      next(error);
    }
  }
}
