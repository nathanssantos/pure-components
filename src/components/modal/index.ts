import Component from '../component';
import './style.scss';

type ModalConstructorProps = {
  className?: string;
  headerInnerHTML?: string;
  bodyInnerHTML?: string;
  footerInnerHTML?: string;
};

class Modal extends Component {
  constructor(props: ModalConstructorProps = {}) {
    const { className = 'modal', headerInnerHTML, bodyInnerHTML, footerInnerHTML } = props;

    super({ className });

    this.init({ headerInnerHTML, bodyInnerHTML, footerInnerHTML });
  }

  assemble = ({
    headerInnerHTML,
    bodyInnerHTML,
    footerInnerHTML,
  }: Partial<ModalConstructorProps>) => {
    return new Promise((resolve) => {
      const overlay = new Component({ className: `${this.target.className}__overlay` });
      const content = new Component({ className: `${this.target.className}__content` });
      const header = new Component({ className: `${this.target.className}__header` });
      const closeButton = new Component({
        type: 'button',
        className: `${this.target.className}__bt-close`,
        innerHTML: 'x',
      });
      const body = new Component({ className: `${this.target.className}__body` });
      const footer = new Component({ className: `${this.target.className}__footer` });

      header.appendChildren({ closeButton });
      content.appendChildren({ header, body, footer });
      this.appendChildren({ overlay, content });

      if (typeof headerInnerHTML === 'string') header.target.innerHTML = headerInnerHTML;
      if (typeof bodyInnerHTML === 'string') body.target.innerHTML = bodyInnerHTML;
      if (typeof footerInnerHTML === 'string') footer.target.innerHTML = footerInnerHTML;

      resolve(true);
    });
  };

  bindEvents = async () => {
    [
      this.children.content.children.header.children.closeButton.target,
      this.children.overlay.target,
    ].forEach((target) => target.addEventListener('click', this.close));
  };

  close = async () => {
    await Promise.allSettled([
      this.children.content.fadeOut({ opacity: '0' }),
      this.children.overlay.fadeOut({ opacity: '0' }),
    ]);
    this.hide();
  };

  init = async ({
    headerInnerHTML,
    bodyInnerHTML,
    footerInnerHTML,
  }: Partial<ModalConstructorProps>) => {
    await this.assemble({
      headerInnerHTML,
      bodyInnerHTML,
      footerInnerHTML,
    });
    this.bindEvents();
  };

  open = async () => {
    this.show();
    await Promise.allSettled([
      this.children.content.fadeIn({ opacity: '1' }),
      this.children.overlay.fadeIn({ opacity: '1' }),
    ]);
  };
}

export default Modal;
