import { UniqueId } from './unique-id';

export abstract class Entity<Props> {
  private _id: UniqueId;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueId) {
    this.props = props;
    this._id = id ?? new UniqueId();
  }
}
