import Component from '../component';
import './style.scss';

type DrawerConstructorProps = {
  className?: string;
  headerInnerHTML?: string;
  bodyInnerHTML?: string;
  footerInnerHTML?: string;
};

class Drawer extends Component {
  constructor(props: DrawerConstructorProps = {}) {
    const { className, headerInnerHTML, bodyInnerHTML, footerInnerHTML } = props;

    super({ className: className || 'drawer' });

    this.init({ headerInnerHTML, bodyInnerHTML, footerInnerHTML });
  }

  assemble = ({
    headerInnerHTML,
    bodyInnerHTML,
    footerInnerHTML,
  }: Partial<DrawerConstructorProps>) => {
    return new Promise((resolve) => {
      const overlay = new Component({ className: `${this.target.className}__overlay` });
      const content = new Component({ className: `${this.target.className}__content` });
      const header = new Component({
        className: `${this.target.className}__header`,
        innerHTML: headerInnerHTML,
      });
      const closeButton = new Component({
        type: 'button',
        className: `${this.target.className}__bt-close`,
        innerHTML: 'x',
      });
      const body = new Component({
        className: `${this.target.className}__body`,
        innerHTML: bodyInnerHTML,
      });
      const footer = new Component({
        className: `${this.target.className}__footer`,
        innerHTML: footerInnerHTML,
      });

      if (typeof headerInnerHTML !== 'string') header.appendChildren({ closeButton });
      content.appendChildren({ header, body, footer });
      this.appendChildren({ overlay, content });

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
      this.children.content.fadeOut({ transform: 'translateX(-100%)' }),
      this.children.overlay.fadeOut({ opacity: '0' }),
    ]);
    this.hide();
  };

  init = async ({
    headerInnerHTML,
    bodyInnerHTML,
    footerInnerHTML,
  }: Partial<DrawerConstructorProps>) => {
    await this.assemble({ headerInnerHTML, bodyInnerHTML, footerInnerHTML });
    this.bindEvents();
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
