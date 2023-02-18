import Component from '../component';
import './style.scss';

class Button extends Component {
  constructor(props: Partial<ButtonConstructorProps> = {}) {
    const { className: newClassName, ...rest } = props;

    const className = newClassName?.length ? `button ${newClassName}` : 'button';

    super({ className, tagName: 'button', ...rest });
  }
}

export default Button;
