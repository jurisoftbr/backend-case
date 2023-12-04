export interface DeleteDocumentFileProvider {
  execute(fileName: string): Promise<void>;
}
