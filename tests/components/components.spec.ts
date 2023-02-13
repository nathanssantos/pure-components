import Component from '../../src/components/component';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new component instance.', () => {
        const component = new Component();

        expect(component.id).toHaveLength(16);
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

    describe('appendChild', () => {
      it('Should append a child to component.', () => {
        const component = new Component();
        const id = '123';
        component.appendChild(new Component({ id }));

        expect(component.target.querySelector(`[id="${id}"]`)).toBeTruthy();
      });
    });
  });
});
