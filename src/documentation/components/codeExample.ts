import { Component } from '../..';

class CodeExample extends Component {
  constructor(
    props: Partial<ComponentConstructorProps & { content: string; language: string }> = {},
  ) {
    super({
      tagName: 'pre',
      ...props,
      style: {
        borderRadius: '0.25rem',
        overflow: 'hidden',
        base: {
          fontSize: '0.875rem',
        },
        md: {
          fontSize: '1rem',
        },
        ...props.style,
      },
      children: {
        code: new Component({
          tagName: 'code',
          innerHTML: props.content,
          className: props.language ? `language-${props.language}` : '',
        }),
      },
    });
  }
}

export default CodeExample;
