import Component from '../component';
import './style.scss';

class Input extends Component {
  public activeTabIndex = 0;

  constructor(props: Partial<InputConstructorProps> = {}) {
    const { className, leftSlot, rightSlot, ...rest } = props;

    const getClassName = () => {
      let newClassName = 'input';

      if (className) newClassName += ` ${className}`;
      if (leftSlot) newClassName += ' input--has-left-slot';
      if (rightSlot) newClassName += ' input--has-right-slot';

      return newClassName;
    };

    super({ className: getClassName(), ...rest });

    this.assemble(props);
  }

  private assemble = (payload: Partial<InputConstructorProps>) => {
    return new Promise((resolve) => {
      const field = new Component({
        tagName: 'input',
        className: 'input__field',
        ...payload.field,
        attributes: {
          type: 'text',
          size: '1',
          ...payload.field?.attributes,
        },
      });
      const fieldWrapper = new Component({
        className: 'input__field-wrapper',
        ...payload.fieldWrapper,
        children: {
          field,
          ...payload.fieldWrapper?.children,
        },
      });

      if (payload.leftSlot) {
        const leftSlot = new Component({
          className: 'input__slot input__slot--left',
          ...payload.leftSlot,
        });
        fieldWrapper.prependChildren({ leftSlot });
      }

      if (payload.rightSlot) {
        const rightSlot = new Component({
          className: 'input__slot input__slot--right',
          ...payload.rightSlot,
        });
        fieldWrapper.appendChildren({ rightSlot });
      }

      if (payload.label) {
        const label = new Component({
          className: 'input__label',
          ...payload.label,
        });

        this.appendChildren({ label });
      }

      this.appendChildren({ fieldWrapper });

      resolve(true);
    });
  };
}

export default Input;
