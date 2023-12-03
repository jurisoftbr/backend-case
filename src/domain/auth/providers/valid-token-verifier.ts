import { AuthorizationData } from '../entities/value-objects/authorization-data';

export interface ValidTokenVerifier {
  execute(token: string): AuthorizationData;
}
