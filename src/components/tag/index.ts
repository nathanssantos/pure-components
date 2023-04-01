import Component from '../component';
import './style.scss';

class Tag extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `tag${className?.length ? ` ${className}` : ''}`,
      ...rest,
    });
  }
}

export default Tag;
