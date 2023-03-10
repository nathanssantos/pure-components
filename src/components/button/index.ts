import Component from '../component';
import './style.scss';

class Button extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `button${className?.length ? ` ${className}` : ''}`,
      tagName: 'button',
      ...rest,
    });
  }
}

export default Button;
