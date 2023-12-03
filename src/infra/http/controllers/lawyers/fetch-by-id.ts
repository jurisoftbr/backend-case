import { FetchLawyerByIdUseCase } from '@/domain/lawyers/use-cases/fetch-lawyer-by-id';
import { inject, injectable } from 'tsyringe';
import { userRequestSchema } from '../../utils/user-request-schema';
import { NextFunction, Request, Response } from 'express';
import { LawyersMapper } from '@/core/mappers/lawyers';

@injectable()
export class FetchLawyerByIdController {
  constructor(
    @inject('FetchLawyerByIdUseCase')
    private fetchLawyerByIdUseCase: FetchLawyerByIdUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: lawyerId } = userRequestSchema.parse(request.user);

      const { lawyer } = await this.fetchLawyerByIdUseCase.execute({
        lawyerId,
      });

      const parsedLawyer = LawyersMapper.toObject(lawyer);

      return response.json({ lawyer: parsedLawyer });
    } catch (error) {
      next(error);
    }
  }
}
