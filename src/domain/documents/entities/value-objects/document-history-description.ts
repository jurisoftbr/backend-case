import { Document } from '../document';
import { DocumentHistoryType } from '../document-history';

interface DocumentHistoryDescriptionProps {
  type: DocumentHistoryType;
  document?: Document;
  text?: string;
}

export class DocumentHistoryDescription {
  constructor(private props: DocumentHistoryDescriptionProps) {}

  get text() {
    return this.props.text || this.createText();
  }

  private createText() {
    const documentTitle = this.props.document.title;
    const typeInPastWord = this.getTypeInPastWord();
    const dateString = this.getDateString(this.props.document.createdAt);
    const hourString = this.getHourString(this.props.document.createdAt);

    return `The document ${documentTitle} was ${typeInPastWord} on ${dateString} at ${hourString}`;
  }

  private getTypeInPastWord(): string {
    const wordsMappedByType = {
      create: 'created',
      update: 'updated',
    };

    return wordsMappedByType[this.props.type];
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
