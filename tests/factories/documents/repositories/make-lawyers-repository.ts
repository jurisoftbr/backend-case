import { LawyersRepository } from '@/domain/documents/repositories/lawyers';

export function makeLawyersRepository() {
  const LawyersRepositoryMock = {
    findById: vi.fn(),
  } as LawyersRepository;

  return LawyersRepositoryMock;
}
