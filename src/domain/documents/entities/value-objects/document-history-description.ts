import { Document } from '../document';
import { DocumentHistoryType } from '../document-history';

export class DocumentHistoryDescription {
  constructor(
    private type: DocumentHistoryType,
    private document: Document
  ) {}

  get text() {
    const documentTitle = this.document.title;
    const typeInPastWord = this.getTypeInPastWord();
    const dateString = this.getDateString(this.document.createdAt);
    const hourString = this.getHourString(this.document.createdAt);

    return `The document ${documentTitle} was ${typeInPastWord} on ${dateString} at ${hourString}`;
  }

  private getTypeInPastWord(): string {
    const wordsMappedByType = {
      create: 'created',
      update: 'updated',
    };

    return wordsMappedByType[this.type];
  }

  private getDateString(date: Date) {
    const day = this.formatDateNumber(date.getDate());
    const month = this.formatDateNumber(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  private getHourString(date: Date) {
    const hour = this.formatDateNumber(date.getHours());
    const minutes = this.formatDateNumber(date.getMinutes());

    return `${hour}:${minutes}`;
  }

  private formatDateNumber(dateNumber: number): string {
    return dateNumber.toString().padStart(2, '0');
  }
}
