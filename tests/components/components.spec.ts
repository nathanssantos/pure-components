import Component from '../../src/components/component';

describe('components', () => {
  describe('component', () => {
    describe('instance', () => {
      it('Should create a new component instance.', () => {
        const component = new Component();

        expect(component.id).toHaveLength(16);
        expect(component.type).toBe('div');
        expect(component.target).toBeInstanceOf(HTMLElement);
        expect(component.target.classList).toContain('component');
      });
    });

    describe('setInnerHTML', () => {
      it('Should set the component inner HTML.', () => {
        const content = '<div>Test</div>';
        const component = new Component();
        component.setInnerHTML(content);

        expect(component.target.innerHTML).toBe('<div>Test</div>');
      });
    });

    describe('setStyle', () => {
      it("Should set one of the component's style props value.", () => {
        const component = new Component();
        component.setStyle('backgroundColor', 'red');

        expect(component.target.style.backgroundColor).toBe('red');
      });
    });

    describe('render', () => {
      it('Should append a component to the target.', () => {
        new Component({ id: '123' }).render(document.body);

        expect(document.body.querySelector('[data-testid="123"]')).toBeTruthy();
      });
    });
  });
});
