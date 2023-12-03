import { ObjectId } from 'bson';

export class UniqueId {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? new ObjectId().toString();
  }

  get value() {
    return this._value;
  }

  toString() {
    return this._value;
  }
}
