import { Lawyer } from '@/domain/auth/entities/lawyer';
import { LawyersMapper } from '@/core/mappers/lawyers';
import { makeLawyer } from 'tests/factories/auth/entities/make-lawyer';

describe('LawyersMapper', () => {
  const lawyerMock = makeLawyer();
  const lawyerFromDatabaseMock = {
    id: lawyerMock.id.value,
    name: lawyerMock.name,
    email: lawyerMock.email,
    password: lawyerMock.password,
    role: lawyerMock.role,
    createdAt: lawyerMock.createdAt,
    updatedAt: lawyerMock.updatedAt,
  };

  describe('toDomain', () => {
    it('should return the object provided as a domain instance', () => {
      const result = LawyersMapper.toDomain(lawyerFromDatabaseMock);

      expect(result).toBeInstanceOf(Lawyer);
      expect(result).toEqual(lawyerMock);
    });
  });

  describe('toObject', () => {
    it('should return the lawyer domain instance provided as an object', () => {
      const result = LawyersMapper.toObject(lawyerMock);

      expect(result).toStrictEqual(lawyerFromDatabaseMock);
    });
  });
});
