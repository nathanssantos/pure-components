import Component from '../../src/components/component';

describe('Components', () => {
  describe('Component', () => {
    it('Should create a new component.', () => {
      const component = new Component();

      expect(component.id).toHaveLength(16);
      expect(component.type).toBe('div');
      expect(component.className).toHaveLength(27);
      expect(component.target).toBeInstanceOf(HTMLElement);
    });

    it('Should append a component to the target.', () => {
      new Component({ id: '123' }).render(document.body);

      expect(document.body.querySelector('[data-testid="123"]')).toBeTruthy();
    });
  });
});
