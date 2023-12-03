import { AuthLawyersRepository } from '@/domain/auth/repositories/auth-lawyers';

export function makeAuthLawyersRepository() {
  const authLawyersRepositoryMock = {
    create: vi.fn(),
    findByEmail: vi.fn(),
  } as AuthLawyersRepository;

  return authLawyersRepositoryMock;
}
