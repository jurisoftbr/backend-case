import { UniqueId } from '@/core/entities/unique-id';
import { Lawyer, LawyerProps } from '@/domain/documents/entities/lawyer';

export function makeLawyer(override?: Partial<LawyerProps>, id?: UniqueId) {
  return Lawyer.create(
    {
      ...override,
    },
    id
  );
}
