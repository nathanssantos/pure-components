import generateUUID from '../src/utils/generateUUID';

describe('Utils', () => {
  describe('generateUUID', () => {
    it('Should generate a 16 characters universal unique identifier.', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();

      expect(uuid1).toHaveLength(16);
      expect(uuid2).toHaveLength(16);
      expect(uuid1 !== uuid2).toBeTruthy();
    });
  });
});
