import { ValidTokenVerifier } from '@/domain/auth/providers/valid-token-verifier';
import { inject, injectable } from 'tsyringe';
import { EnvService } from '../env/env-service';
import * as jwt from 'jsonwebtoken';
import { AuthorizationData } from '@/domain/auth/entities/object-values/authorization-data';

interface JwtPayload {
  id: string;
  role: string;
}

@injectable()
export class JwtValidTokenVerifier implements ValidTokenVerifier {
  constructor(@inject(EnvService) private envService: EnvService) {}

  execute(token: string) {
    const payload = jwt.verify(
      token,
      this.envService.get('TOKEN_SIGN_KEY') as string
    ) as JwtPayload;

    return new AuthorizationData(payload.id, payload.role);
  }
}
