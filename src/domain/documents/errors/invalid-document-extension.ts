export class InvalidDocumentExtension extends Error {
  constructor(fileName: string) {
    super(`The file ${fileName} extension is invalid`);
  }
}
