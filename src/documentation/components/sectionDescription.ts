import { Component } from '../..';

class SectionDescription extends Component {
  constructor(props: Partial<ComponentConstructorProps>) {
    super({
      style: {
        marginBottom: '1rem',
        base: {
          fontSize: 'var(--pc-font-size-sm)',
        },
        md: {
          fontSize: 'var(--pc-font-size-md)',
        },
      },
      ...props,
    });
  }
}

export default SectionDescription;
