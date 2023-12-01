import { Entity } from '@/core/entities/entity';
import { UniqueId } from '@/core/entities/unique-id';

export interface LawyerProps {}

export class Lawyer extends Entity<LawyerProps> {
  static create(props: LawyerProps, id?: UniqueId) {
    return new Lawyer(props, id);
  }
}
