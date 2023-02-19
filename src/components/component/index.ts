import generateUUID from '../../utils/generateUUID';

class Component {
  public children: { [name: string]: Component } = {};
  public id: string;
  public target: HTMLElement;

  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { attributes, children, className, events, innerHTML, style, tagName } = props;

    const id = generateUUID();

    this.target = document.createElement(tagName || 'div');
    this.setAttributes({ id });
    this.id = id;

    if (attributes) this.setAttributes(attributes);
    if (className?.length) {
      this.target.classList.add('pure-components', ...className.split(' '));
    }

    if (style) this.setStyle(style);
    if (typeof innerHTML === 'string') this.target.innerHTML = innerHTML;
    if (children) this.appendChildren(children);
    if (events) this.bindEvents(events);
  }

  public appendChildren = (payload: ComponentConstructorProps['children']) => {
    for (const [name, component] of Object.entries(payload)) {
      this.children[name] = component;
      this.target.append(component.target);
    }
  };

  public appendTo = (target: HTMLElement) => {
    target.append(this.target);
  };

  public bindEvents = async (payload: ComponentConstructorProps['events']) => {
    for (const [name, action] of Object.entries(payload)) {
      this.target.addEventListener(name, action);
    }
  };

  static create = (payload: Partial<ComponentConstructorProps> = {}) => {
    return new Component(payload);
  };

  public destroy = () => {
    this.target.parentNode?.removeChild(this.target);
  };

  public fadeIn = (to: ComponentConstructorProps['style'] = {}) => {
    return new Promise((resolve) => {
      this.show();
      setTimeout(() => {
        this.setStyle(to);
        resolve(true);
      }, 0);
    });
  };

  public fadeOut = (to: ComponentConstructorProps['style'] = {}) => {
    return new Promise((resolve) => {
      this.setStyle(to);
      setTimeout(() => {
        this.hide();
        resolve(true);
      }, Number(getComputedStyle(this.target).transitionDuration.split('s')[0]) * 1000);
    });
  };

  public hide = () => {
    this.target.style.display = 'none';
  };

  public prependChildren = (payload: ComponentConstructorProps['children']) => {
    for (const [name, component] of Object.entries(payload)) {
      this.children[name] = component;
      this.target.prepend(component.target);
    }
  };

  public prependTo = (target: HTMLElement) => {
    target.prepend(this.target);
  };

  public setAttributes = (payload: ComponentConstructorProps['attributes']) => {
    for (const [key, value] of Object.entries(payload)) {
      this.target.setAttribute(key, value.toString());
    }
  };

  public setStyle = (payload: ComponentConstructorProps['style']) => {
    for (const [key, value] of Object.entries(payload)) this.target.style[key] = value;
  };

  public show = () => {
    this.target.style.display = 'flex';
  };
}

export default Component;
