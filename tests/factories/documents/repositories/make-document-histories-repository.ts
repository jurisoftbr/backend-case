import { DocumentHistoriesRepository } from '@/domain/documents/repositories/document-histories';

export function makeDocumentHistoriesRepository() {
  const documentHistoriesRepositoryMock = {
    create: vi.fn(),
    findByDocumentId: vi.fn(),
  } as DocumentHistoriesRepository;

  return documentHistoriesRepositoryMock;
}