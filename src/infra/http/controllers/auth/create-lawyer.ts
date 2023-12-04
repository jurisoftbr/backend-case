import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { inject, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { AuthLawyersMapper } from '@/core/mappers/auth-lawyers';
import { HTTP_STATUS } from '../../statuses';
import { ValidationError } from '@/core/errors/validation-error';

const createNormalRoleLawyerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

@injectable()
export class CreateLawyerController {
  constructor(
    @inject(CreateNormalRoleLawyerUseCase)
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

      const parsedLawyer = AuthLawyersMapper.toObject(lawyer);

      return response
        .status(HTTP_STATUS.CREATED)
        .json({ lawyer: parsedLawyer, token });
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationError(error.errors[0].path[0] as string));
      }
      next(error);
    }
  }
}
