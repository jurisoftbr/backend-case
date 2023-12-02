import { AuthorizationData } from '../entities/object-values/authorization-data';

export interface ValidTokenVerifier {
  execute(token: string): AuthorizationData;
}
