import Component from '../component';
import './style.scss';

class Modal extends Component {
  constructor(props: ModalConstructorProps = {}) {
    super({ className: 'modal' });
    this.init(props);
  }

  private assemble = (payload: ModalConstructorProps) => {
    return new Promise((resolve) => {
      const btClose = new Component({
        className: 'modal__bt-close',
        innerHTML: 'x',
        type: 'button',
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
    await Promise.allSettled([
      this.children.content.fadeOut({ opacity: '0' }),
      this.children.overlay.fadeOut({ opacity: '0' }),
    ]);

    this.hide();
  };

  private init = async (payload: ModalConstructorProps) => {
    await this.assemble(payload);

    [this.children.content.children.header.children.btClose, this.children.overlay].forEach(
      (component) => component.bindEvents({ click: this.close }),
    );
  };

  public open = async () => {
    this.show();

    await Promise.allSettled([
      this.children.content.fadeIn({ opacity: '1' }),
      this.children.overlay.fadeIn({ opacity: '1' }),
    ]);
  };
}

export default Modal;
