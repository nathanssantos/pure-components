import Component from '../component';
import Container from '../container';
import './style.scss';

class Header extends Component {
  constructor(props: Partial<HeaderConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({
      className: `header${className?.length ? ` ${className}` : ''}`,
      tagName: 'header',
      ...rest,
    });

    this.init(props);
  }

  private assemble = (payload: Partial<HeaderConstructorProps>) => {
    return new Promise((resolve) => {
      const leftContent = new Component({
        className: 'header__left-content',
        ...payload.leftContent,
      });
      const centerContent = new Component({
        className: 'header__center-content',
        ...payload.centerContent,
      });
      const rightContent = new Component({
        className: 'header__right-content',
        ...payload.rightContent,
      });
      const container = new Container({
        children: { leftContent, centerContent, rightContent },
        className: 'header__container',
        ...payload.container,
      });

      this.appendChildren({ container });

      resolve(true);
    });
  };

  private init = (payload: Partial<HeaderConstructorProps>) => {
    this.assemble(payload);
  };
}

export default Header;
