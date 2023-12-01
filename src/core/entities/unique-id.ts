import { randomUUID } from 'node:crypto';

export class UniqueId {
  private _value: string;

  constructor(value?: string) {
    this._value = value ?? randomUUID();
  }

  get value() {
    return this._value;
  }

  toString() {
    return this._value;
  }
}
