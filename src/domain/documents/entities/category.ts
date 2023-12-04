import { Entity } from '@/core/entities/entity';
import { UniqueId } from '@/core/entities/unique-id';

export interface CategoryProps {
  name: string;
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name;
  }

  static create(props: CategoryProps, id?: UniqueId) {
    return new Category(props, id);
  }
}
