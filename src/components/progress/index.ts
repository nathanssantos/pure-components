import Component from '../component';
import './style.scss';

class Progress extends Component {
  constructor(props: Partial<ProgressConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `progress${className?.length ? ` ${className}` : ''}`,
      ...rest,
    });

    this.init(props);
  }

  private assemble = (payload: Partial<ProgressConstructorProps>) => {
    return new Promise((resolve) => {
      const fill = new Component({
        className: 'progress__fill',
        ...payload.fill,
      });

      const value = new Component({
        className: 'progress__value',
        ...payload.value,
      });

      this.appendChildren({ fill, value });

      resolve(true);
    });
  };

  private init = (payload: Partial<ProgressConstructorProps>) => {
    this.assemble(payload);
    this.setValue(0);
  };

  public setValue = (value: number) => {
    this.children.fill.setStyle({ width: `${value}%` });
    this.children.value.target.innerHTML = `${value}%`;
  };
}

export default Progress;
