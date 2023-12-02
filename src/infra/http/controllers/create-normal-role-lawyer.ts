import { CreateNormalRoleLawyerUseCase } from '@/domain/auth/use-cases/create-normal-role-lawyer';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { z } from 'zod';
import { LawyerAlreadyExistsError } from '@/domain/auth/errors/lawyer-already-exists';
import { LawyersMapper } from '@/core/mappers/lawyers';

const createNormalRoleLawyerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

@injectable()
export class CreateNormalRoleLawyerController {
  constructor(
    @inject('CreateNormalRoleLawyerUseCase')
    private createNormalRoleLawyerUseCase: CreateNormalRoleLawyerUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { name, email, password } = createNormalRoleLawyerBodySchema.parse(
      request.body
    );

    try {
      const { lawyer } = await this.createNormalRoleLawyerUseCase.execute({
        name,
        email,
        password,
      });

      const parsedLawyer = LawyersMapper.toObject(lawyer);

      return response.status(201).json(parsedLawyer);
    } catch (error) {
      if (error instanceof LawyerAlreadyExistsError) {
        return response.status(401).json({ message: error.message });
      }

      return response.status(500).json({ message: 'Internal error' });
    }
  }
}
