import Component from '.';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new Component instance.', () => {
        const child = new Component({ innerHTML: 'child' });
        const component = new Component({
          tagName: 'a',
          innerHTML: '<div>link</div>',
          className: 'component test',
          style: { backgroundColor: 'red', md: { height: '100px' } },
          attributes: {
            href: 'https://link.com',
          },
          events: {
            click: () => '',
          },
          children: {
            child,
          },
        });

        expect(component.id).toHaveLength(36);
        expect(component.target.tagName).toBe('A');
        expect(component.target).toBeInstanceOf(HTMLElement);
        expect(component.target.getAttribute('href')).toBe('https://link.com');
        expect(component.target.innerHTML).toBe(
          `<div>link</div><div data-testid="${child.id}" class="pure-components component--${child.id}">child</div>`,
        );
        expect(component.target.classList).toContain('component');
        expect(component.target.classList).toContain('test');
        expect(getComputedStyle(component.target).backgroundColor).toBe('red');
        expect(component.children.child).toBeInstanceOf(Component);
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

        expect(component.target.querySelector(`[data-testid="${child1.id}"]`)).toBeTruthy();
        expect(component.target.querySelector(`[data-testid="${child2.id}"]`)).toBeTruthy();
      });
    });

    describe('appendTo', () => {
      it('Should append the component to a target.', () => {
        const component = new Component();
        const child = new Component();

        child.appendTo(component.target);

        expect(component.target.querySelector(`[data-testid="${child.id}"]`)).toBeTruthy();
      });
    });

    describe('create', () => {
      it('Should create a component.', () => {
        const child1 = Component.create();
        const component = Component.create({
          children: {
            child1,
          },
        });

        expect(component.target.querySelector(`[data-testid="${child1.id}"]`)).toBeTruthy();
      });
    });

    describe('destroy', () => {
      it('Should destroy the component.', () => {
        const component = new Component();
        document.body.append(component.target);
        component.destroy();

        expect(document.body.querySelector(`[data-testid="${component.id}"]`)).toBeFalsy();
      });
    });

    describe('fadeIn', () => {
      it('Should fade the component in.', async () => {
        const component = new Component();
        await component.fadeIn({ opacity: '1' });

        expect(getComputedStyle(component.target).display).toBe('flex');
        expect(getComputedStyle(component.target).opacity).toBe('1');
      });
    });

    describe('fadeOut', () => {
      it('Should fade the component out.', async () => {
        const component = new Component();
        await component.fadeOut({ opacity: '0' });

        expect(getComputedStyle(component.target).display).toBe('none');
        expect(getComputedStyle(component.target).opacity).toBe('0');
      });
    });

    describe('hide', () => {
      it('Should set component display to "none".', () => {
        const component = new Component();
        component.hide();

        expect(getComputedStyle(component.target).display).toBe('none');
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

        expect(component.target.querySelector(`[data-testid="${child1.id}"]`)).toBeTruthy();
        expect(component.target.querySelector(`[data-testid="${child2.id}"]`)).toBeTruthy();
      });
    });

    describe('prependTo', () => {
      it('Should prepend the component to a target.', () => {
        const component = new Component();
        const child = new Component();

        child.prependTo(component.target);

        expect(component.target.querySelector(`[data-testid="${child.id}"]`)).toBeTruthy();
      });
    });

    describe('setState', () => {
      it("Should set component's state props.", () => {
        const component = new Component();
        component.setState({
          key1: 'value1',
          key2: 'value2',
        });

        expect(component.state.key1).toBe('value1');
        expect(component.state.key2).toBe('value2');
      });
    });

    describe('setStyle', () => {
      it("Should set component's style props.", () => {
        const component = new Component();
        component.setStyle({
          backgroundColor: 'red',
          fontFamily: 'Arial',
          md: { height: '100px' },
        });

        expect(getComputedStyle(component.target).backgroundColor).toBe('red');
        expect(getComputedStyle(component.target).fontFamily).toBe('Arial');
        expect(
          (document.querySelector('[id="pure-components__stylesheet"]') as HTMLStyleElement)
            .sheet?.cssRules[0].cssText,
        ).toBe(
          `@media screen and (min-width: 48em) {.component--${component.id} {height: 100px;}}`,
        );
      });
    });

    describe('show', () => {
      it('Should set component display to "flex".', () => {
        const component = new Component();
        component.show();

        expect(getComputedStyle(component.target).display).toBe('flex');
      });
    });
  });
});
