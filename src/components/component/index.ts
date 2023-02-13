import generateUUID from '../../utils/generateUUID';
import './style.scss';

type ComponentConstructorProps = {
  id?: string;
  type?: string;
  className?: string | string[];
  style?: Partial<CSSStyleDeclaration>;
  innerHTML?: string;
  transitionTime?: number;
};

class Component {
  id: string;
  target: HTMLElement;
  children: { [name: string]: Component };
  transitionTime: number;

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { id, type, className, innerHTML, transitionTime } = props;

    this.id = id || uuid;
    this.target = document.createElement(type || 'div');
    if (id) this.target.setAttribute('id', id);
    if (className?.length) {
      Array.isArray(className)
        ? this.target.classList.add(...className)
        : this.target.classList.add(className);
    }
    if (innerHTML?.length) this.target.innerHTML = innerHTML;
    this.transitionTime = transitionTime || 500;
    this.children = {};
  }

  setStyle = (styleDeclaration: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(styleDeclaration)) this.target.style[key] = value;
  };

  fadeIn = (to: Partial<CSSStyleDeclaration> = {}) => {
    return new Promise((resolve) => {
      this.setStyle({ display: 'flex' });
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
        this.setStyle({ display: 'none' });
        resolve(true);
      }, this.transitionTime);
    });
  };

  appendChildren = (children: { [name: string]: Component }) => {
    for (const [name, component] of Object.entries(children)) {
      this.children[name] = component;
      this.target.append(component.target);
    }
  };
}

export default Component;
