import Button from '.';

describe('Components', () => {
  describe('Button', () => {
    describe('instance and assemble', () => {
      it('Should create a new button instance.', () => {
        const component1 = new Button({ className: 'test my-button' });
        const component2 = new Button();

        expect(component1.target.classList).toContain('button');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-button');
        expect(component2.target.classList).toContain('button');
      });
    });
  });
});
