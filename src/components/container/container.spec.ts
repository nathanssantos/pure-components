import Container from '.';

describe('Components', () => {
  describe('Container', () => {
    describe('instance and assemble', () => {
      it('Should create a new container instance.', () => {
        const component1 = new Container();
        const component2 = new Container({ className: 'test' });

        expect(component1.target.classList).toContain('container');
        expect(component2.target.classList).toContain('test');
        expect(component2.target.classList).toContain('container');
      });
    });
  });
});
