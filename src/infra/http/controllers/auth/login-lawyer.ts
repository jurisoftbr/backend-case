import { inject, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { LoginLawyerUseCase } from '@/domain/auth/use-cases/login-lawyer';
import { AuthLawyersMapper } from '@/core/mappers/auth-lawyers';
import { ValidationError } from '@/core/errors/validation-error';

const loginLawyerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

@injectable()
export class LoginLawyerController {
  constructor(
    @inject(LoginLawyerUseCase) private loginLawyerUseCase: LoginLawyerUseCase
  ) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = loginLawyerBodySchema.parse(request.body);

      const { lawyer, token } = await this.loginLawyerUseCase.execute({
        email,
        password,
      });

      const parsedLawyer = AuthLawyersMapper.toObject(lawyer);

      return response.json({ lawyer: parsedLawyer, token });
    } catch (error) {
      if (error instanceof ZodError) {
        next(new ValidationError(error.errors[0].path[0] as string));
      }

      next(error);
    }
  }
}
