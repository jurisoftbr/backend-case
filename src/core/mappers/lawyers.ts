import { UniqueId } from '@/core/entities/unique-id';
import { Lawyer } from '@/domain/auth/entities/lawyer';

interface LawyerObject {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'normal';
  createdAt: Date;
  updatedAt: Date;
}

export class LawyersMapper {
  static toDomain({
    id,
    name,
    email,
    password,
    role,
    createdAt,
    updatedAt,
  }: LawyerObject): Lawyer {
    return Lawyer.create(
      {
        name,
        email,
        role,
        password,
        createdAt,
        updatedAt,
      },
      new UniqueId(id)
    );
  }

  static toObject(lawyer: Lawyer): LawyerObject {
    return {
      id: lawyer.id.value,
      name: lawyer.name,
      email: lawyer.email,
      password: lawyer.password,
      role: lawyer.role,
      createdAt: lawyer.createdAt,
      updatedAt: lawyer.updatedAt,
    };
  }
}
