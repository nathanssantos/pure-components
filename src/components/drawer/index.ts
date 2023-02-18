import Button from '../button';
import Component from '../component';
import './style.scss';

class Drawer extends Component {
  constructor(props: Partial<DrawerConstructorProps> = {}) {
    const {
      className: newClassName,
      btClose,
      header,
      body,
      footer,
      content,
      overlay,
      ...rest
    } = props;

    const className = newClassName?.length ? `drawer ${newClassName}` : 'drawer';

    super({ className, ...rest });

    this.init({ btClose, header, body, footer, content, overlay });
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
    await Promise.allSettled([
      this.children.content.fadeOut({ transform: 'translateX(-100%)' }),
      this.children.overlay.fadeOut({ opacity: '0' }),
    ]);

    this.hide();
  };

  private init = async (payload: Partial<DrawerConstructorProps>) => {
    await this.assemble(payload);

    [this.children.content.children.header.children.btClose, this.children.overlay].forEach(
      (component) => component.bindEvents({ click: this.close }),
    );
  };

  public open = async () => {
    this.show();

    await Promise.allSettled([
      this.children.content.fadeIn({ transform: 'translateX(0)' }),
      this.children.overlay.fadeIn({ opacity: '1' }),
    ]);
  };
}

export default Drawer;
