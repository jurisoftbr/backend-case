import { AuthLawyersRepository } from '@/domain/auth/repositories/auth-lawyers';

export function makeLawyersRepository() {
  const LawyersRepositoryMock = {
    create: vi.fn(),
    findByEmail: vi.fn(),
  } as AuthLawyersRepository;

  return LawyersRepositoryMock;
}
