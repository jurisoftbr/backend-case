import { HTTP_STATUS } from '@/core/utils/http-status';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';

const deleteDocumentParamsSchema = z.object({
  documentId: z.string(),
  lawyerId: z.string(),
});

@injectable()
export class DeleteDocumentController {
  constructor(
    @inject('DeleteDocumentUseCase')
    private deleteDocumentUseCase: DeleteDocumentUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId, lawyerId } = deleteDocumentParamsSchema.parse(
        request.params
      );

      await this.deleteDocumentUseCase.execute({
        documentId,
        lawyerId,
      });

      return response.status(HTTP_STATUS.ACCEPTED).end();
    } catch (error) {
      next(error);
    }
  }
}
