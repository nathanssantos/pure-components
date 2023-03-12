import Button from '../button';
import Component from '../component';
import './style.scss';

class Toast extends Component {
  constructor(props: Partial<ToastConstructorProps> = {}) {
    const { className, position = 'bottom-right', variant = 'default', ...rest } = props;

    const getClassName = () => {
      let newClassName = 'toast';

      newClassName += ` toast--${position}`;
      newClassName += ` toast--${variant}`;

      if (className) newClassName += ` ${className}`;

      return newClassName;
    };

    super({
      className: getClassName(),
      ...rest,
    });

    this.assemble(rest);
  }

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
          click: this.dismiss,
        },
      });
      const header = new Component({
        className: 'toast__header',
        children: { title, closeButton },
      });
      const description = new Component({
        className: 'toast__description',
        ...payload.description,
      });

      this.appendChildren({ header, description });

      resolve(true);
    });
  };

  public dismiss = () => {
    return new Promise((resolve) => {
      this.target.classList.remove('toast--open');

      setTimeout(() => {
        this.target.remove();

        resolve(true);
      }, 500);
    });
  };

  public show = () => {
    return new Promise((resolve) => {
      const toasts = document.querySelectorAll('.toast');

      if (toasts.length) for (const toast of toasts) toast.remove();

      this.appendTo(document.querySelector('body')!);

      setTimeout(() => {
        this.target.classList.add('toast--open');
      }, 0);

      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };

  static async trigger(payload: Partial<ToastConstructorProps>) {
    const { duration = 3000 } = payload;

    const toast = new Toast(payload);

    await toast.show();

    return await new Promise((resolve) => {
      setTimeout(async () => {
        await toast.dismiss();
        resolve(true);
      }, duration);
    });
  }
}

export default Toast;
