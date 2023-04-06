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
          fontSize: 'var(--pc-font-size-sm)',
        },
        md: {
          fontSize: 'var(--pc-font-size-md)',
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
