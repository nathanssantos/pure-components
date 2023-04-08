import Component from '../component';
import './style.scss';

class Radio extends Component {
  constructor(props: Partial<RadioConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `radio${className?.length ? ` ${className}` : ''}`, ...rest });

    this.assemble(props);
  }

  private assemble = (payload: Partial<RadioConstructorProps>) => {
    return new Promise((resolve) => {
      const icon = new Component({
        className: 'radio__icon',
        ...payload.icon,
      });
      const field = new Component({
        className: 'radio__field',
        tagName: 'input',
        ...payload.field,
        attributes: {
          type: 'radio',
          ...payload.field?.attributes,
        },
      });
      const border = new Component({
        className: 'radio__border',
        ...payload.border,
        children: {
          icon,
          ...payload.border?.children,
        },
      });
      const label = new Component({
        className: 'radio__label',
        tagName: 'label',
        ...payload.label,
      });

      label.prependChildren({ border, field });

      this.appendChildren({ label });

      resolve(true);
    });
  };
}

export default Radio;
