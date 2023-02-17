import generateUUID from '../../utils/generateUUID';
import './style.scss';

class Component {
  public children: { [name: string]: Component } = {};
  public id: string;
  public target: HTMLElement;

  constructor(public props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { children, className, events, innerHTML, style, type } = props;

    this.target = document.createElement(type || 'div');
    this.id = uuid;
    this.target.setAttribute('id', uuid);

    if (typeof innerHTML === 'string') this.target.innerHTML = innerHTML;
    if (children) this.appendChildren(children);
    if (className?.length) {
      Array.isArray(className)
        ? this.target.classList.add('pure-components', ...className)
        : this.target.classList.add('pure-components', className);
    }
    if (events) this.bindEvents(events);
    if (style) this.setStyle(style);
  }

  public appendChildren = (payload: ComponentConstructorProps['children']) => {
    if (payload) {
      for (const [name, component] of Object.entries(payload)) {
        this.children[name] = component;
        this.target.append(component.target);
      }
    }
  };

  public bindEvents = async (payload: ComponentConstructorProps['events']) => {
    if (payload) {
      for (const [name, action] of Object.entries(payload)) {
        this.target.addEventListener(name, action);
      }
    }
  };

  public destroy = () => {
    this.target.parentNode?.removeChild(this.target);
  };

  public fadeIn = (to: Partial<CSSStyleDeclaration> = {}) => {
    return new Promise((resolve) => {
      this.show();
      setTimeout(() => {
        this.setStyle(to);
        resolve(true);
      }, 0);
    });
  };

  public fadeOut = (to: Partial<CSSStyleDeclaration> = {}) => {
    return new Promise((resolve) => {
      this.setStyle(to);
      setTimeout(() => {
        this.hide();
        resolve(true);
      }, 500);
    });
  };

  public hide = () => {
    this.target.style.display = 'none';
  };

  public setStyle = (payload: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(payload)) this.target.style[key] = value;
  };

  public show = () => {
    this.target.style.display = 'flex';
  };
}

export default Component;
