import generateUUID from '../../utils/generateUUID';
import './style.scss';

class Component {
  children: { [name: string]: Component } = {};
  id: string;
  target: HTMLElement;
  transitionTime: number;

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { children, className, events, id, innerHTML, style, transitionTime, type } = props;

    this.target = document.createElement(type || 'div');

    if (children) this.appendChildren(children);
    if (className?.length) {
      Array.isArray(className)
        ? this.target.classList.add(...className)
        : this.target.classList.add(className);
    }
    if (events) this.bindEvents(events);
    this.id = id || uuid;
    if (id) this.target.setAttribute('id', id);
    if (typeof innerHTML === 'string') this.target.innerHTML = innerHTML;
    if (style) this.setStyle(style);
    this.transitionTime = transitionTime || 500;
  }

  appendChildren = (payload: ComponentConstructorProps['children']) => {
    if (!payload) return;

    for (const [name, component] of Object.entries(payload)) {
      this.children[name] = component;
      this.target.append(component.target);
    }
  };

  bindEvents = async (payload: ComponentConstructorProps['events']) => {
    if (!payload) return;

    for (const [name, action] of Object.entries(payload)) {
      this.target.addEventListener(name, action);
    }
  };

  destroy = () => {
    this.target.parentNode?.removeChild(this.target);
  };

  fadeIn = (to: Partial<CSSStyleDeclaration> = {}) => {
    return new Promise((resolve) => {
      this.show();
      setTimeout(() => {
        this.setStyle(to);
        resolve(true);
      }, 0);
    });
  };

  fadeOut = (to: Partial<CSSStyleDeclaration> = {}) => {
    return new Promise((resolve) => {
      this.setStyle(to);
      setTimeout(() => {
        this.hide();
        resolve(true);
      }, this.transitionTime);
    });
  };

  hide = () => {
    this.target.style.display = 'none';
  };

  setStyle = (payload: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(payload)) this.target.style[key] = value;
  };

  show = () => {
    this.target.style.display = 'flex';
  };
}

export default Component;
