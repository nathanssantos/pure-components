import Component from '../component';
import Select from '../select';

describe('Components', () => {
  describe('Select', () => {
    describe('instance and assemble', () => {
      it('Should create a new select instance.', () => {
        const component = new Select({
          className: 'test my-select',
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

        expect(component.target.classList).toContain('select');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-select');
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
