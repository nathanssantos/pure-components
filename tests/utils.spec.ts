import Utils from '../src/utils';

describe('utils', () => {
  describe('generateUUID', () => {
    it('Should generate a 16 characters universal unique identifier.', () => {
      const uuid1 = Utils.generateUUID();
      const uuid2 = Utils.generateUUID();

      expect(uuid1).toHaveLength(16);
      expect(uuid2).toHaveLength(16);
      expect(uuid1 !== uuid2).toBeTruthy();
    });
  });
});
