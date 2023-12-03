import { Entity } from '@/core/entities/entity';
import { UniqueId } from '@/core/entities/unique-id';

export type AuthLawyerRole = 'admin' | 'normal';

export interface AuthLawyerProps {
  name: string;
  email: string;
  password: string;
  role: AuthLawyerRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AuthLawyer extends Entity<AuthLawyerProps> {
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

  static create(props: AuthLawyerProps, id?: UniqueId) {
    return new AuthLawyer(props, id);
  }
}
