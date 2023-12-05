import { Document } from '../document';
import { DocumentHistoryType } from '../document-history';

interface DocumentHistoryDescriptionProps {
  text: string;
}

interface CreateFromTypeProps {
  type: DocumentHistoryType;
  document: Document;
}

export class DocumentHistoryDescription {
  constructor(private props: DocumentHistoryDescriptionProps) {}

  get text() {
    return this.props.text;
  }

  static createFromType({ type, document }: CreateFromTypeProps) {
    const wordsMappedByType = {
      create: 'created',
      update: 'updated',
    };

    const documentTitle = document.title;
    const typeInPastWord = wordsMappedByType[type];
    const dateString = document.createdAt.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return new DocumentHistoryDescription({
      text: `The document ${documentTitle} was ${typeInPastWord} on ${dateString}`,
    });
  }
}
