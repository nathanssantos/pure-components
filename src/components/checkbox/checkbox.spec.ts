import Component from '../component';
import Checkbox from '.';

describe('Components', () => {
  describe('Checkbox', () => {
    describe('instance and assemble', () => {
      it('Should create a new checkbox instance.', () => {
        const component1 = new Checkbox({
          className: 'test my-checkbox',
          field: {
            attributes: { 'data-test': 'test' },
          },
          border: {
            children: {
              test: 'test',
            },
          },
        });
        const component2 = new Checkbox();

        expect(component1.target.classList).toContain('checkbox');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-checkbox');
        expect(component1.children.label).toBeInstanceOf(Component);
        expect(component1.children.label.children.field).toBeInstanceOf(Component);
        expect(component1.children.label.children.border).toBeInstanceOf(Component);
        expect(component1.children.label.children.border.children.icon).toBeInstanceOf(
          Component,
        );
        expect(component2.target.classList).toContain('checkbox');
      });
    });
  });
});
