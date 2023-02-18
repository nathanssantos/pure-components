import Component from '../../src/components/component';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new Component instance.', () => {
        const testChild = new Component({ innerHTML: 'child' });
        const component = new Component({
          innerHTML: '<div>abc</div>',
          children: {
            testChild,
          },
          className: ['component', 'test'],
          events: {
            click: () => '',
          },
          style: { backgroundColor: 'red' },
          type: 'header',
        });

        expect(component.id).toHaveLength(16);
        expect(component.target.tagName).toBe('HEADER');
        expect(component.target).toBeInstanceOf(HTMLElement);
        expect(component.target.innerHTML).toBe(
          `<div>abc</div><div id="${testChild.id}">child</div>`,
        );
        expect(component.target.classList).toContain('component');
        expect(component.target.classList).toContain('test');
        expect(component.target.style.backgroundColor).toBe('red');
        expect(component.children.testChild).toBeInstanceOf(Component);
      });
    });

    describe('appendChildren', () => {
      it('Should append children to the component.', () => {
        const component = new Component();
        const child1 = new Component();
        const child2 = new Component();

        component.appendChildren({
          child1,
          child2,
        });

        expect(component.target.querySelector(`[id="${child1.id}"]`)).toBeTruthy();
        expect(component.target.querySelector(`[id="${child2.id}"]`)).toBeTruthy();
      });
    });

    describe('appendTo', () => {
      it('Should append the component to a target.', () => {
        const component = new Component();
        const child1 = new Component();

        child1.appendTo(component.target);

        expect(component.target.querySelector(`[id="${child1.id}"]`)).toBeTruthy();
      });
    });

    describe('destroy', () => {
      it('Should destroy the component.', () => {
        const component = new Component();
        document.body.append(component.target);
        component.destroy();

        expect(document.body.querySelector(`[id="${component.id}"]`)).toBeFalsy();
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

    describe('hide', () => {
      it('Should set component display to "none".', () => {
        const component = new Component();
        component.hide();

        expect(component.target.style.display).toBe('none');
      });
    });

    describe('prependChildren', () => {
      it('Should prepend children to the component.', () => {
        const component = new Component();
        const child1 = new Component();
        const child2 = new Component();

        component.prependChildren({
          child1,
          child2,
        });

        expect(component.target.querySelector(`[id="${child1.id}"]`)).toBeTruthy();
        expect(component.target.querySelector(`[id="${child2.id}"]`)).toBeTruthy();
      });
    });

    describe('prependTo', () => {
      it('Should prepend the component to a target.', () => {
        const component = new Component();
        const child1 = new Component();

        child1.prependTo(component.target);

        expect(component.target.querySelector(`[id="${child1.id}"]`)).toBeTruthy();
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

    describe('show', () => {
      it('Should set component display to "flex".', () => {
        const component = new Component();
        component.show();

        expect(component.target.style.display).toBe('flex');
      });
    });
  });
});
