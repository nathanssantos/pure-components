import Component from '../component';
import Radio from '.';

describe('Components', () => {
  describe('Radio', () => {
    describe('instance and assemble', () => {
      it('Should create a new avatar instance.', () => {
        const component1 = new Radio({
          className: 'test my-radio',
          field: {
            attributes: { 'data-test': 'test' },
          },
          border: {
            children: {
              test: 'test',
            },
          },
        });
        const component2 = new Radio();

        expect(component1.target.classList).toContain('radio');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-radio');
        expect(component1.children.label).toBeInstanceOf(Component);
        expect(component1.children.label.children.field).toBeInstanceOf(Component);
        expect(component1.children.label.children.border).toBeInstanceOf(Component);
        expect(component1.children.label.children.border.children.icon).toBeInstanceOf(
          Component,
        );
        expect(component2.target.classList).toContain('radio');
      });
    });
  });
});
