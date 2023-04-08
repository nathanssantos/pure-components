import Component from '../component';
import './style.scss';

class Checkbox extends Component {
  constructor(props: Partial<CheckboxConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `checkbox${className?.length ? ` ${className}` : ''}`, ...rest });

    this.assemble(props);
  }

  private assemble = (payload: Partial<CheckboxConstructorProps>) => {
    return new Promise((resolve) => {
      const icon = new Component({
        className: 'checkbox__icon',
        innerHTML:
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="12" height="12" stroke-width="4" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>',
        ...payload.icon,
      });
      const field = new Component({
        className: 'checkbox__field',
        tagName: 'input',
        ...payload.field,
        attributes: {
          type: 'checkbox',
          ...payload.field?.attributes,
        },
      });
      const border = new Component({
        className: 'checkbox__border',
        ...payload.border,
        children: {
          icon,
          ...payload.border?.children,
        },
      });
      const label = new Component({
        className: 'checkbox__label',
        tagName: 'label',
        ...payload.label,
      });

      label.prependChildren({ border, field });

      this.appendChildren({ label });

      resolve(true);
    });
  };
}

export default Checkbox;
