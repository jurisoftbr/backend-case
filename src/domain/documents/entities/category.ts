import { Entity } from '@/core/entities/entity';
import { UniqueId } from '@/core/entities/unique-id';

export interface CategoryProps {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CategoryProps, id?: UniqueId) {
    return new Category(props, id);
  }
}
