import Component from '../component';
import './style.scss';

class Avatar extends Component {
  description?: string;
  name?: string;
  size?: string;
  src?: string;

  constructor(props: AvatarConstructorProps = {}) {
    super({ className: 'avatar' });
    this.init(props);
  }

  private assemble = (payload: AvatarConstructorProps) => {
    return new Promise((resolve) => {
      const image = new Component({
        attributes: {
          src: payload.src || '',
        },
        className: 'avatar__image',
        style: {
          width: payload.size || '2.5rem',
          height: payload.size || '2.5rem',
        },
        type: 'img',
        ...payload.imageComponent,
      });
      const imageWrapper = new Component({
        children: { image },
        className: 'avatar__image-wrapper',
        ...payload.imageWrapperComponent,
      });
      const name = new Component({
        className: 'avatar__name',
        innerHTML: payload.name,
        ...payload.nameComponent,
      });
      const description = new Component({
        className: 'avatar__description',
        innerHTML: payload.description,
        ...payload.descriptionComponent,
      });
      const textWrapper = new Component({
        children: { name, description },
        className: 'avatar__text-wrapper',
        ...payload.textWrapperComponent,
      });

      this.appendChildren({ imageWrapper, textWrapper });

      resolve(true);
    });
  };

  private init = async (payload: AvatarConstructorProps) => {
    await this.assemble(payload);
  };
}

export default Avatar;
