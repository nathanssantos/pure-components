import Component from '../../src/components/component';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new component instance.', () => {
        const component = new Component();

        expect(component.id).toHaveLength(16);
        expect(component.target).toBeInstanceOf(HTMLElement);
        expect(component.target.tagName).toBe('DIV');
        expect(component.target.classList).toContain('component');
      });
    });

    describe('setStyle', () => {
      it("Should set one of the component's style props value.", () => {
        const component = new Component();
        component.setStyle({ backgroundColor: 'red' });

        expect(component.target.style.backgroundColor).toBe('red');
      });
    });

    describe('render', () => {
      it('Should append a component to the target.', () => {
        new Component({ id: '123' }).render(document.body);

        expect(document.body.querySelector('[testid="123"]')).toBeTruthy();
      });
    });
  });
});
