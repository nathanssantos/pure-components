import Component from '../component';
import Input from '../input';

describe('Components', () => {
  describe('Input', () => {
    describe('instance and assemble', () => {
      it('Should create a new input instance.', () => {
        const component = new Input({
          className: 'test my-input',
          label: {
            innerHTML: 'Label',
          },
          fieldWrapper: {
            children: {
              addon: new Component({}),
            },
          },
          field: {
            attributes: {
              type: 'password',
            },
          },
          leftSlot: {
            innerHTML: 'left',
          },
          rightSlot: {
            innerHTML: 'right',
          },
        });

        expect(component.target.classList).toContain('input');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-input');
        expect(component.children.fieldWrapper.children.addon).toBeInstanceOf(Component);
        expect(component.children.fieldWrapper.children.field.target.getAttribute('type')).toBe(
          'password',
        );
        expect(component.children.label.target.innerHTML).toBe('Label');
        expect(component.children.fieldWrapper.children.leftSlot.target.innerHTML).toBe('left');
        expect(component.children.fieldWrapper.children.rightSlot.target.innerHTML).toBe(
          'right',
        );
      });
    });
  });
});
