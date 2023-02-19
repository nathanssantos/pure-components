import Button from '../button';
import Component from '../component';
import './style.scss';

class Drawer extends Component {
  constructor(props: Partial<DrawerConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `drawer${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<DrawerConstructorProps>) => {
    return new Promise((resolve) => {
      const btClose = new Button({
        className: 'drawer__bt-close',
        innerHTML: 'x',
        ...payload.btClose,
      });
      const header = new Component({
        children: { btClose },
        className: 'drawer__header',
        ...payload.header,
      });
      const body = new Component({
        className: 'drawer__body',
        ...payload.body,
      });
      const footer = new Component({
        className: 'drawer__footer',
        ...payload.footer,
      });
      const content = new Component({
        children: { header, body, footer },
        className: 'drawer__content',
        ...payload.content,
      });
      const overlay = new Component({
        className: 'drawer__overlay',
        ...payload.overlay,
      });

      this.appendChildren({ overlay, content });

      resolve(true);
    });
  };

  public close = async () => {
    const { content, overlay } = this.children;

    await Promise.allSettled([
      content.fadeOut({ transform: 'translateX(-100%)' }),
      overlay.fadeOut({ opacity: '0' }),
    ]);

    this.hide();
  };

  private init = async (payload: Partial<DrawerConstructorProps>) => {
    await this.assemble(payload);

    const { content, overlay } = this.children;

    for (const component of [content.children.header.children.btClose, overlay]) {
      component.bindEvents({ click: this.close });
    }
  };

  public open = async () => {
    this.show();

    const { content, overlay } = this.children;

    await Promise.allSettled([
      content.fadeIn({ transform: 'translateX(0)' }),
      overlay.fadeIn({ opacity: '1' }),
    ]);
  };
}

export default Drawer;
