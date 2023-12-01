import { UniqueId } from '@/core/entities/unique-id';

vi.mock('bson', () => {
  const ObjectId = vi.fn();

  ObjectId.prototype.toString = () => 'random bson id';

  return { ObjectId };
});

describe('Entity: UniqueId', () => {
  let sut: UniqueId;

  describe('when the value is provided', () => {
    it('.toString() should return the value provided', () => {
      sut = new UniqueId('uuid');

      expect(sut.toString()).toBe('uuid');
    });

    it('value should return the value provided', () => {
      sut = new UniqueId('uuid');

      expect(sut.value).toBe('uuid');
    });
  });

  describe('when the value is not provided', () => {
    it('.toString() should return the value provided', () => {
      sut = new UniqueId();

      expect(sut.toString()).toBe('random bson id');
    });

    it('value should return the value provided', () => {
      sut = new UniqueId();

      expect(sut.value).toBe('random bson id');
    });
  });
});
