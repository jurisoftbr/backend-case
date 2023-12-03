import { HTTP_STATUS } from '@/core/utils/http-status';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import { userRequestSchema } from '../utils/user-request-schema';

const deleteDocumentParamsSchema = z.object({
  documentId: z.string(),
});

@injectable()
export class DeleteDocumentController {
  constructor(
    @inject('DeleteDocumentUseCase')
    private deleteDocumentUseCase: DeleteDocumentUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId } = deleteDocumentParamsSchema.parse(request.params);
      const { id: lawyerId } = userRequestSchema.parse(request.user);

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
