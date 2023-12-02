import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { z } from 'zod';
import { LoginLawyerUseCase } from '@/domain/auth/use-cases/login-lawyer';
import { LawyersMapper } from '@/core/mappers/lawyers';
import { BadCredentialsError } from '@/domain/auth/errors/bad-credentials';

const loginLawyerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

@injectable()
export class LoginLawyerController {
  constructor(
    @inject('LoginLawyerUseCase') private loginLawyerUseCase: LoginLawyerUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { email, password } = loginLawyerBodySchema.parse(request.body);

    try {
      const { lawyer, token } = await this.loginLawyerUseCase.execute({
        email,
        password,
      });

      const parsedLawyer = LawyersMapper.toObject(lawyer);

      return response.json({ lawyer: parsedLawyer, token });
    } catch (error) {
      if (error instanceof BadCredentialsError) {
        return response.status(401).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal error' });
    }
  }
}
