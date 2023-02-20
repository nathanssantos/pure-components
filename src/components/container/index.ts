import Component from '../component';
import './style.scss';

class Container extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `container${className?.length ? ` ${className}` : ''}`,
      ...rest,
    });
  }
}

export default Container;
