import { LawyersRepository } from '@/domain/lawyers/repositories/lawyers';

export function makeLawyersRepository() {
  const lawyersRepositoryMock = {
    findById: vi.fn(),
  } as LawyersRepository;

  return lawyersRepositoryMock;
}
