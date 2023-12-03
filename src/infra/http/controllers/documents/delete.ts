import { HTTP_STATUS } from '../../statuses';
import { DeleteDocumentUseCase } from '@/domain/documents/use-cases/delete-document';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { z } from 'zod';
import { requestUserSchema } from '../../schemas/request-user';

const deleteDocumentParamsSchema = z.object({
  documentId: z.string(),
});

@injectable()
export class DeleteDocumentController {
  constructor(
    @inject(DeleteDocumentUseCase)
    private deleteDocumentUseCase: DeleteDocumentUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { documentId } = deleteDocumentParamsSchema.parse(request.params);
      const { id: lawyerId } = requestUserSchema.parse(request.user);

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
