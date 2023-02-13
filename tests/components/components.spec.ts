import Component from '../../src/components/component';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new component instance.', () => {
        const component = new Component({
          id: '123',
          innerHTML: '<div>abc</div>',
          className: ['component', 'test'],
        });

        expect(component.id).toBe('123');
        expect(component.target).toBeInstanceOf(HTMLElement);
      });
    });

    describe('setStyle', () => {
      it("Should set component's style props.", () => {
        const component = new Component();
        component.setStyle({ backgroundColor: 'red', fontFamily: 'Arial' });

        expect(component.target.style.backgroundColor).toBe('red');
        expect(component.target.style.fontFamily).toBe('Arial');
      });
    });

    describe('appendChildren', () => {
      it('Should append children to component.', () => {
        const component = new Component();
        component.appendChildren({
          child1: new Component({ id: '123' }),
          child2: new Component({ id: '456' }),
        });

        expect(component.target.querySelector(`[id="123"]`)).toBeTruthy();
        expect(component.target.querySelector(`[id="456"]`)).toBeTruthy();
      });
    });
  });
});
