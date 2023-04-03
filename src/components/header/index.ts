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

    this.assemble(props);
  }

  private assemble = (payload: Partial<HeaderConstructorProps>) => {
    return new Promise((resolve) => {
      const container = new Container({
        className: 'header__container',
        ...payload.container,
      });

      if (payload.leftContent) {
        container.appendChildren({
          leftContent: new Component({
            className: 'header__left-content',
            ...payload.leftContent,
          }),
        });
      }

      if (payload.centerContent) {
        container.appendChildren({
          centerContent: new Component({
            className: 'header__center-content',
            ...payload.centerContent,
          }),
        });
      }

      if (payload.rightContent) {
        container.appendChildren({
          rightContent: new Component({
            className: 'header__right-content',
            ...payload.rightContent,
          }),
        });
      }

      this.appendChildren({ container });

      resolve(true);
    });
  };
}

export default Header;
