import Component from '../component';
import './style.scss';

class TabPanel extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `tab-panel${className?.length ? ` ${className}` : ''}`,
      ...rest,
    });
  }
}

export default TabPanel;
