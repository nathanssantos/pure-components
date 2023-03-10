import { Component } from '../..';

class SectionDescription extends Component {
  constructor(props: Partial<ComponentConstructorProps>) {
    super({
      style: {
        marginBottom: '1rem',
        base: {
          fontSize: '0.875rem',
        },
        md: {
          fontSize: '1rem',
        },
      },
      ...props,
    });
  }
}

export default SectionDescription;
