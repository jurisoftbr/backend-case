import { UniqueId } from '@/core/entities/unique-id';
import { AuthLawyer } from '@/domain/auth/entities/auth-lawyer';
import { faker } from '@faker-js/faker';

export function makeAuthLawyer(override?: Partial<AuthLawyer>, id?: UniqueId) {
  return AuthLawyer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'normal',
      ...override,
    },
    id
  );
}
