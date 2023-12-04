import { DocumentLawyersRepository } from '@/domain/documents/repositories/document-lawyers';

export function makeDocumentLawyersRepository() {
  const documentawyersRepositoryMock = {
    findById: vi.fn(),
  } as DocumentLawyersRepository;

  return documentawyersRepositoryMock;
}
