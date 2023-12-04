/* eslint-disable indent */
import { DeleteDocumentFileProvider } from '@/domain/documents/providers/delete-document-file';
import { DeleteDocumentFileError } from '@/domain/documents/errors/delete-document-file';
import path from 'path';
import fs from 'fs';

export class FsDeleteDocumentFileProvider
  implements DeleteDocumentFileProvider
{
  execute(fileName: string): void {
    let errorWhileDeleteFile: boolean = false;

    const filePath = path.join(__dirname, '../../../uploads', fileName);

    try {
      fs.rmSync(filePath);
    } catch (error) {
      errorWhileDeleteFile = true;
    }

    if (errorWhileDeleteFile) throw new DeleteDocumentFileError();
  }
}
