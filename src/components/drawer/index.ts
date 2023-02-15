import Component from '../component';
import './style.scss';

type DrawerConstructorProps = {
  body?: ComponentConstructorProps;
  className?: string;
  footer?: ComponentConstructorProps;
  header?: ComponentConstructorProps;
};

class Drawer extends Component {
  constructor(props: DrawerConstructorProps = {}) {
    const { body, className = 'drawer', footer, header } = props;

    super({ className });

    this.init({ header, body, footer });
  }

  assemble = (payload: Partial<DrawerConstructorProps>) => {
    return new Promise((resolve) => {
      const btClose = new Component({
        type: 'button',
        className: `${this.target.className}__bt-close`,
        innerHTML: 'x',
      });
      const header = new Component({
        ...payload.header,
        children: typeof payload.header?.innerHTML !== 'string' ? { btClose } : {},
        className: `${this.target.className}__header${
          payload.header?.className?.length ? ` ${payload.header.className}` : ''
        }`,
      });
      const body = new Component({
        ...payload.body,
        className: `${this.target.className}__body${
          payload.body?.className?.length ? ` ${payload.body.className}` : ''
        }`,
      });
      const footer = new Component({
        ...payload.footer,
        className: `${this.target.className}__footer${
          payload.footer?.className?.length ? ` ${payload.footer.className}` : ''
        }`,
      });
      const content = new Component({
        children: { header, body, footer },
        className: `${this.target.className}__content`,
      });
      const overlay = new Component({ className: `${this.target.className}__overlay` });

      this.appendChildren({ overlay, content });

      resolve(true);
    });
  };

  close = async () => {
    await Promise.allSettled([
      this.children.content.fadeOut({ transform: 'translateX(-100%)' }),
      this.children.overlay.fadeOut({ opacity: '0' }),
    ]);

    this.hide();
  };

  init = async (payload: Partial<DrawerConstructorProps>) => {
    await this.assemble(payload);

    [this.children.content.children.header.children.btClose, this.children.overlay].forEach(
      (component) => component.bindEvents({ click: this.close }),
    );
  };

  open = async () => {
    this.show();

    await Promise.allSettled([
      this.children.content.fadeIn({ transform: 'translateX(0)' }),
      this.children.overlay.fadeIn({ opacity: '1' }),
    ]);
  };
}

export default Drawer;
