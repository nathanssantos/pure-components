import Button from '../../src/components/button';

describe('components', () => {
  describe('button', () => {
    describe('instance and assemble', () => {
      it('Should create a new button instance and assemble it.', () => {
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
