import { AuthLawyer } from '@/domain/auth/entities/auth-lawyer';
import { AuthLawyersMapper } from '@/core/mappers/auth-lawyers';
import { makeAuthLawyer } from 'tests/factories/auth/entities/make-auth-lawyer';

describe('AuthLawyersMapper', () => {
  const authLawyerMock = makeAuthLawyer();
  const lawyerFromDatabaseMock = {
    id: authLawyerMock.id.value,
    name: authLawyerMock.name,
    email: authLawyerMock.email,
    password: authLawyerMock.password,
    role: authLawyerMock.role,
    createdAt: authLawyerMock.createdAt,
    updatedAt: authLawyerMock.updatedAt,
  };

  describe('toDomain', () => {
    it('should return the object provided as a domain instance', () => {
      const result = AuthLawyersMapper.toDomain(lawyerFromDatabaseMock);

      expect(result).toBeInstanceOf(AuthLawyer);
      expect(result).toEqual(authLawyerMock);
    });
  });

  describe('toObject', () => {
    it('should return the lawyer domain instance provided as an object', () => {
      const result = AuthLawyersMapper.toObject(authLawyerMock);

      expect(result).toStrictEqual(lawyerFromDatabaseMock);
    });
  });
});
