import { UniqueId } from '@/core/entities/unique-id';
import { AuthLawyer } from '@/domain/auth/entities/auth-lawyer';

interface AuthLawyerObject {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'normal';
  createdAt: Date;
  updatedAt: Date;
}

export class AuthLawyersMapper {
  static toDomain({
    id,
    name,
    email,
    password,
    role,
    createdAt,
    updatedAt,
  }: AuthLawyerObject): AuthLawyer {
    return AuthLawyer.create(
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

  static toObject(lawyer: AuthLawyer): AuthLawyerObject {
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
