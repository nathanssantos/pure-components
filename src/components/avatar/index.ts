import Component from '../component';
import './style.scss';

class Avatar extends Component {
  constructor(props: Partial<AvatarConstructorProps> = {}) {
    const {
      className: newClassName,
      image,
      imageContainer,
      name,
      description,
      textContainer,
      ...rest
    } = props;

    const className = newClassName?.length ? `avatar ${newClassName}` : 'avatar';

    super({ className, ...rest });

    this.init({ image, imageContainer, name, description, textContainer });
  }

  private assemble = (payload: Partial<AvatarConstructorProps>) => {
    return new Promise((resolve) => {
      const image = new Component({
        className: 'avatar__image',
        tagName: 'img',
        ...payload.image,
      });
      const imageContainer = new Component({
        children: { image },
        className: 'avatar__image-wrapper',
        ...payload.imageContainer,
      });
      const name = new Component({
        className: 'avatar__name',
        ...payload.name,
      });
      const description = new Component({
        className: 'avatar__description',
        ...payload.description,
      });
      const textContainer = new Component({
        children: { name, description },
        className: 'avatar__text-wrapper',
        ...payload.textContainer,
      });

      this.appendChildren({ imageContainer, textContainer });

      resolve(true);
    });
  };

  private init = (payload: Partial<AvatarConstructorProps>) => {
    this.assemble(payload);
  };
}

export default Avatar;
