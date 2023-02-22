import { Component } from '../../main';

class SectionTitle extends Component {
  constructor(props: Partial<ComponentConstructorProps>) {
    super({
      style: {
        marginBottom: '1rem',
        base: {
          fontSize: '1.5rem',
        },
        md: {
          fontSize: '1.75rem',
        },
      },
      ...props,
    });
  }
}

export default SectionTitle;
