import { LawyersRepository } from '@/domain/auth/repositories/lawyers';

export function makeLawyersRepository() {
  const LawyersRepositoryMock = {
    create: vi.fn(),
    findByEmail: vi.fn(),
  } as LawyersRepository;

  return LawyersRepositoryMock;
}
