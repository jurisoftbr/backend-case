import { DocumentsMapper } from '@/core/mappers/documents';
import { HTTP_STATUS } from '../../statuses';
import { CreateDocumentUseCase } from '@/domain/documents/use-cases/create-document';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import { requestUserSchema } from '../../schemas/request-user';

const createDocumentsBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  fileUrl: z.string().url(),
});

@injectable()
export class CreateDocumentController {
  constructor(
    @inject(CreateDocumentUseCase)
    private createDocumentUseCase: CreateDocumentUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: lawyerId } = requestUserSchema.parse(request.user);
      const { title, description, fileUrl } = createDocumentsBodySchema.parse(
        request.body
      );

      const { document } = await this.createDocumentUseCase.execute({
        title,
        description,
        fileUrl,
        lawyerId,
      });

      const parsedDocument = DocumentsMapper.toObject(document);

      return response.status(HTTP_STATUS.CREATED).json(parsedDocument);
    } catch (error) {
      next(error);
    }
  }
}
