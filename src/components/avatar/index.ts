import Component from '../component';
import './style.scss';

class Avatar extends Component {
  constructor(props: Partial<AvatarConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `avatar${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<AvatarConstructorProps>) => {
    return new Promise((resolve) => {
      const image = new Component({
        className: 'avatar__image',
        tagName: 'img',
        ...payload.image,
      });
      const imageWrapper = new Component({
        children: { image },
        className: 'avatar__image-wrapper',
        ...payload.imageWrapper,
      });
      const name = new Component({
        className: 'avatar__name',
        ...payload.name,
      });
      const description = new Component({
        className: 'avatar__description',
        ...payload.description,
      });
      const textWrapper = new Component({
        children: { name, description },
        className: 'avatar__text-wrapper',
        ...payload.textWrapper,
      });

      this.appendChildren({ imageWrapper, textWrapper });

      resolve(true);
    });
  };

  private init = (payload: Partial<AvatarConstructorProps>) => {
    this.assemble(payload);
  };
}

export default Avatar;
