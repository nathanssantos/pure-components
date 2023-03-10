import { Component } from '../..';

class CodeExample extends Component {
  constructor(props: Partial<ComponentConstructorProps> = {}) {
    super({
      tagName: 'pre',
      ...props,
      style: {
        whiteSpace: 'break-spaces',
        backgroundColor: '#3f3f3f',
        padding: '1rem',
        borderRadius: '0.25rem',
        margin: '0',
        base: {
          fontSize: '0.875rem',
        },
        md: {
          fontSize: '1rem',
        },
        ...props.style,
      },
    });
  }
}

export default CodeExample;
