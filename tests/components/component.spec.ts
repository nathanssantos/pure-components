import Component from '../../src/components/component';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new component instance.', () => {
        const component = new Component({
          id: '123',
          type: 'header',
          innerHTML: '<div>abc</div>',
          className: ['component', 'test'],
          transitionTime: 1200,
        });

        expect(component.id).toBe('123');
        expect(component.target.tagName).toBe('HEADER');
        expect(component.target).toBeInstanceOf(HTMLElement);
        expect(component.target.innerHTML).toBe('<div>abc</div>');
        expect(component.target.classList).toContain('component');
        expect(component.target.classList).toContain('test');
        expect(component.transitionTime).toBe(1200);
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

    describe('hide', () => {
      it('Should set component display to "none".', () => {
        const component = new Component();
        component.hide();

        expect(component.target.style.display).toBe('none');
      });
    });

    describe('show', () => {
      it('Should set component display to "flex".', () => {
        const component = new Component();
        component.show();

        expect(component.target.style.display).toBe('flex');
      });
    });

    describe('fadeIn', () => {
      it('Should set fade the component in.', async () => {
        const component = new Component();
        component.hide();
        await component.fadeIn({ opacity: '1' });

        expect(component.target.style.display).toBe('flex');
        expect(component.target.style.opacity).toBe('1');
      });
    });

    describe('fadeOut', () => {
      it('Should set fade the component out.', async () => {
        const component = new Component();
        await component.fadeOut({ opacity: '0' });

        expect(component.target.style.display).toBe('none');
        expect(component.target.style.opacity).toBe('0');
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
  });
});
