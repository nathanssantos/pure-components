import Component from '../component';
import './style.scss';

type ModalConstructorProps = {
  body?: ComponentConstructorProps;
  btClose?: ComponentConstructorProps;
  content?: ComponentConstructorProps;
  footer?: ComponentConstructorProps;
  header?: ComponentConstructorProps;
  overlay?: ComponentConstructorProps;
};

class Modal extends Component {
  constructor(props: ModalConstructorProps = {}) {
    super({ className: 'modal' });
    this.init(props);
  }

  private assemble = (payload: ModalConstructorProps) => {
    return new Promise((resolve) => {
      const btClose = new Component({
        ...payload.btClose,
        type: 'button',
        className: 'modal__bt-close',
        innerHTML: 'x',
      });
      const header = new Component({
        ...payload.header,
        children: { btClose },
        className: 'modal__header',
      });
      const body = new Component({
        ...payload.body,
        className: 'modal__body',
      });
      const footer = new Component({
        ...payload.footer,
        className: 'modal__footer',
      });
      const content = new Component({
        ...payload.content,
        children: { header, body, footer },
        className: 'modal__content',
      });
      const overlay = new Component({
        ...payload.overlay,
        className: 'modal__overlay',
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
