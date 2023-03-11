import Component from '../component';
import './style.scss';
import Button from '../button';

class Toast extends Component {
  constructor(props: Partial<ToastConstructorProps> = {}) {
    const { className, position = 'bottom-left', ...rest } = props;

    super({
      className: `toast__${position} toast${className?.length ? ` ${className} ` : ''}`,
      ...rest,
    });
    this.init(props);
  }

  public static trigger(payload: Partial<ToastConstructorProps>) {
    return new Toast(payload);
  }

  private init = async (payload: Partial<ToastConstructorProps>) => {
    const { duration = 30000 } = payload;

    await this.assemble(payload);

    this.show();
    await setTimeout(() => this.dismiss(), duration);
  };

  public show = () => {
    const lastToast = document.querySelector('.toast');
    if (lastToast) {
      lastToast.remove();
    }
    this.appendTo(document.querySelector('body')!);

    setTimeout(() => this.target.classList.add('toast__open'), 300);
  };
  private assemble = (payload: Partial<ToastConstructorProps>) => {
    return new Promise((resolve) => {
      const title = new Component({
        className: 'toast__title',
        tagName: 'span',
        ...payload.title,
      });

      const closeButton = new Button({
        className: 'toast__bt-close',
        innerHTML: 'x',
        events: {
          click: () => this.dismiss(),
        },
      });

      const header = new Component({
        className: 'toast__header',
        children: { title, closeButton },
      });

      const description = new Component({
        className: 'toast__description',
        tagName: 'p',
        ...payload.description,
      });

      const toastContainer = new Component({
        className: `toast__container toast__${payload.variant ?? 'default'}`,
        children: { header, description },
      });

      this.appendChildren({ toastContainer });
      resolve(true);
    });
  };

  private dismiss = () => {
    this.target.classList.remove('toast__open');
    setTimeout(() => this.destroy(), 300);
  };
}

export default Toast;
