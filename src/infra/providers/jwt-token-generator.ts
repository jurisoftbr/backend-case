import { TokenGeneratorProvider } from '@/domain/auth/providers/token-generator';
import { EnvService } from '../env/env-service';
import * as jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class JwtTokenGeneratorProvider implements TokenGeneratorProvider {
  constructor(@inject('EnvService') private envService: EnvService) {}

  execute(id: string, role: string) {
    const token = jwt.sign(
      {
        id,
        role,
      },
      this.envService.get('TOKEN_SIGN_KEY') as string,
      { expiresIn: '120min' }
    );

    return token;
  }
}
