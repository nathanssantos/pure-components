import Utils from '.';

describe('Utils', () => {
  describe('camelCaseToKebabCase', () => {
    it('Should format a camel case string into a kebab case string.', () => {
      const cameCaseString = 'testString';
      const kebabCaseString = 'test-string';

      expect(Utils.camelCaseToKebabCase(cameCaseString)).toBe(kebabCaseString);
    });
  });
});
