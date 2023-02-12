import generateUUID from '../src/utils/generateUUID';

describe('Utils', () => {
  describe('generateUUID', () => {
    it('Should generate a 16 characters universal unique identifier.', () => {
      const uuid = generateUUID();
      expect(uuid).toHaveLength(16);
    });
  });
});
