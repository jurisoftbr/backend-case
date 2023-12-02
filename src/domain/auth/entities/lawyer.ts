import { Entity } from '@/core/entities/entity';
import { UniqueId } from '@/core/entities/unique-id';

type LawyerRole = 'admin' | 'normal';

export interface LawyerProps {
  name: string;
  email: string;
  password: string;
  role: LawyerRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Lawyer extends Entity<LawyerProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: LawyerProps, id?: UniqueId) {
    return new Lawyer(props, id);
  }
}