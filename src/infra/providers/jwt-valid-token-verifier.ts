import { ValidTokenVerifier } from '@/domain/auth/providers/valid-token-verifier';
import { inject, injectable } from 'tsyringe';
import { EnvService } from '../env/env-service';
import * as jwt from 'jsonwebtoken';
import { AuthorizationData } from '@/domain/auth/entities/value-objects/authorization-data';
import { InvalidTokenError } from '@/domain/auth/errors/invalid-token';

interface JwtPayload {
  id: string;
  role: string;
}

@injectable()
export class JwtValidTokenVerifier implements ValidTokenVerifier {
  constructor(@inject(EnvService) private envService: EnvService) {}

  execute(token: string) {
    try {
      const payload = jwt.verify(
        token,
        this.envService.get('TOKEN_SIGN_KEY') as string
      ) as JwtPayload;

      return new AuthorizationData(payload.id, payload.role);
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError ||
        error instanceof jwt.JsonWebTokenError
      ) {
        throw new InvalidTokenError();
      }

      throw error;
    }
  }
}
