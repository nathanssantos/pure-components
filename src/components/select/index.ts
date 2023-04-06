import Component from '../component';
import './style.scss';

class Select extends Component {
  public activeTabIndex = 0;

  constructor(props: Partial<SelectConstructorProps> = {}) {
    const { className, leftSlot, rightSlot, ...rest } = props;

    const getClassName = () => {
      let newClassName = 'select select--has-right-slot';

      if (className) newClassName += ` ${className}`;
      if (leftSlot) newClassName += ' select--has-left-slot';

      return newClassName;
    };

    super({ className: getClassName(), ...rest });

    this.assemble(props);
  }

  private assemble = (payload: Partial<InputConstructorProps>) => {
    return new Promise((resolve) => {
      const field = new Component({
        tagName: 'select',
        className: 'select__field',
        ...payload.field,
        attributes: {
          size: '1',
          ...payload.field?.attributes,
        },
      });

      const chevronDownIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>';

      const rightSlot = new Component({
        className: 'select__slot select__slot--right',
        innerHTML: chevronDownIcon,
        ...payload.rightSlot,
      });

      const fieldWrapper = new Component({
        className: 'select__field-wrapper',
        ...payload.fieldWrapper,
        children: {
          field,
          rightSlot,
          ...payload.fieldWrapper?.children,
        },
      });

      if (payload.leftSlot) {
        const leftSlot = new Component({
          className: 'select__slot select__slot--left',
          ...payload.leftSlot,
        });
        fieldWrapper.prependChildren({ leftSlot });
      }

      if (payload.label) {
        const label = new Component({
          className: 'select__label',
          ...payload.label,
        });

        this.appendChildren({ label });
      }

      this.appendChildren({ fieldWrapper });

      resolve(true);
    });
  };
}

export default Select;
