import { Component } from '../../main';

class CodeExample extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    super({
      tagName: 'pre',
      style: {
        whiteSpace: 'break-spaces',
        backgroundColor: '#3f3f3f',
        padding: '1rem',
        borderRadius: '0.25rem',
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

export default CodeExample;
