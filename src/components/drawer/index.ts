import Component from '../component';
import './style.scss';

class Drawer extends Component {
  constructor() {
    super({ className: 'drawer' });
    this.init();
  }

  open = async () => {
    this.show();
    await Promise.allSettled([
      this.children.content.fadeIn({ transform: 'translateX(0)' }),
      this.children.overlay.fadeIn({ opacity: '1' }),
    ]);
  };

  close = async () => {
    await Promise.allSettled([
      this.children.content.fadeOut({ transform: 'translateX(-100%)' }),
      this.children.overlay.fadeOut({ opacity: '0' }),
    ]);
    this.hide();
  };

  assemble = () => {
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

      resolve(true);
    });
  };

  bindEvents = async () => {
    this.children.content.children.header.children.closeButton.target.addEventListener(
      'click',
      this.close,
    );
    this.children.overlay.target.addEventListener('click', this.close);
  };

  init = async () => {
    await this.assemble();
    this.bindEvents();
  };
}

export default Drawer;
