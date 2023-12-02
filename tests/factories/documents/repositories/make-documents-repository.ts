import { DocumentsRepository } from '@/domain/documents/repositories/documents';

export function makeDocumentsRepository() {
  const documentsRepositoryMock = {
    findByLawyerId: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
  } as DocumentsRepository;

  return documentsRepositoryMock;
}
