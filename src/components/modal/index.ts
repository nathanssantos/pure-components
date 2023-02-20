import Button from '../button';
import Component from '../component';
import './style.scss';

class Modal extends Component {
  constructor(props: Partial<ModalConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `modal${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<ModalConstructorProps>) => {
    return new Promise((resolve) => {
      const btClose = new Button({
        className: 'modal__bt-close',
        innerHTML: 'x',
        ...payload.btClose,
      });
      const header = new Component({
        children: { btClose },
        className: 'modal__header',
        ...payload.header,
      });
      const body = new Component({
        className: 'modal__body',
        ...payload.body,
      });
      const footer = new Component({
        className: 'modal__footer',
        ...payload.footer,
      });
      const content = new Component({
        children: { header, body, footer },
        className: 'modal__content',
        ...payload.content,
      });
      const overlay = new Component({
        className: 'modal__overlay',
        ...payload.overlay,
      });

      this.appendChildren({ overlay, content });

      resolve(true);
    });
  };

  public close = async () => {
    const { content, overlay } = this.children;

    await Promise.allSettled([
      content.fadeOut({ opacity: '0' }),
      overlay.fadeOut({ opacity: '0' }),
    ]);

    this.hide();
  };

  private init = async (payload: Partial<ModalConstructorProps>) => {
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
      content.fadeIn({ opacity: '1' }),
      overlay.fadeIn({ opacity: '1' }),
    ]);
  };
}

export default Modal;
