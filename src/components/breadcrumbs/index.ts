import Component from '../component';
import './style.scss';

class Breadcrumbs extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `breadcrumbs${className?.length ? ` ${className}` : ''}`,
      ...rest,
    });
  }
}

export default Breadcrumbs;
