import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { inject, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { LawyersMapper } from '@/core/mappers/lawyers';
import { HTTP_STATUS } from '@/core/utils/http-status';

const createNormalRoleLawyerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

@injectable()
export class CreateLawyerController {
  constructor(
    @inject('CreateNormalRoleLawyerUseCase')
    private createNormalRoleLawyerUseCase: CreateNormalRoleLawyerUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password } = createNormalRoleLawyerBodySchema.parse(
        request.body
      );

      const { lawyer, token } =
        await this.createNormalRoleLawyerUseCase.execute({
          name,
          email,
          password,
        });

      const parsedLawyer = LawyersMapper.toObject(lawyer);

      return response
        .status(HTTP_STATUS.CREATED)
        .json({ lawyer: parsedLawyer, token });
    } catch (error) {
      next(error);
    }
  }
}
