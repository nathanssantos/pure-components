import Tag from '.';

describe('Components', () => {
  describe('Tag', () => {
    describe('instance and assemble', () => {
      it('Should create a new tag instance and assemble it.', () => {
        const component1 = new Tag({ className: 'test my-tag' });
        const component2 = new Tag();

        expect(component1.target.classList).toContain('tag');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-tag');
        expect(component2.target.classList).toContain('tag');
      });
    });
  });
});
