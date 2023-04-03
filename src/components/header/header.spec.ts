import Component from '../component';
import Header from '.';

describe('Components', () => {
  describe('Header', () => {
    describe('instance and assemble', () => {
      it('Should create a new header instance.', () => {
        const component = new Header({ className: 'test my-header' });
        const component2 = new Header({
          leftContent: {
            innerHTML: 'leftContent',
          },
          centerContent: {
            children: {
              centerComponent: new Component(),
            },
          },
          rightContent: {
            innerHTML: 'rightContent',
          },
        });

        expect(component.target.classList).toContain('header');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-header');
        expect(component.children.container).toBeInstanceOf(Component);
        expect(component.children.container.children.leftContent).toBe(undefined);
        expect(component.children.container.children.centerContent).toBe(undefined);
        expect(component.children.container.children.rightContent).toBe(undefined);
        expect(component2.children.container.children.leftContent).toBeInstanceOf(Component);
        expect(component2.children.container.children.centerContent).toBeInstanceOf(Component);
        expect(component2.children.container.children.rightContent).toBeInstanceOf(Component);
        expect(
          component2.children.container.children.centerContent.children.centerComponent,
        ).toBeInstanceOf(Component);
      });
    });
  });
});
