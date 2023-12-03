import { UniqueId } from '@/core/entities/unique-id';
import { Lawyer } from '@/domain/lawyers/entities/lawyer';
import { faker } from '@faker-js/faker';

export function makeLawyer(override?: Partial<Lawyer>, id?: UniqueId) {
  return Lawyer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'normal',
      ...override,
    },
    id
  );
}
