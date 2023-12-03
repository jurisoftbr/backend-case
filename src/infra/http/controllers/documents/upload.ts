import { UpdateDocumentFileUrlUseCase } from '@/domain/documents/use-cases/update-document-file-url';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const uploadDocumentByIdParamsSchema = z.object({
  documentId: z.string(),
});
const uploadDocumentByIdFileSchema = z.object({
  filename: z.string(),
});

@injectable()
export class UploadDocumentController {
  constructor(
    @inject(UpdateDocumentFileUrlUseCase)
    private updateDocumentFileUrlUseCase: UpdateDocumentFileUrlUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId } = uploadDocumentByIdParamsSchema.parse(
        request.params
      );
      const { filename: fileName } = uploadDocumentByIdFileSchema.parse(
        request.file
      );

      const { fileUrl } = await this.updateDocumentFileUrlUseCase.execute({
        documentId,
        fileName,
      });

      return response.json({ fileUrl, fileName });
    } catch (error) {
      next(error);
    }
  }
}
