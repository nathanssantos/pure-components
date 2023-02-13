import generateUUID from '../../utils/generateUUID';
import './style.scss';

type ComponentConstructorProps = {
  id?: string;
  type?: string;
  className?: string | string[];
  innerHTML?: string;
};

class Component {
  id: string;
  target: HTMLElement;
  children: Component[];

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { id, type, className, innerHTML } = props;

    this.id = id || uuid;
    this.target = document.createElement(type || 'div');
    if (id) this.target.setAttribute('id', id);
    if (className?.length) {
      Array.isArray(className)
        ? this.target.classList.add(...className)
        : this.target.classList.add(className);
    }
    if (innerHTML?.length) this.target.innerHTML = innerHTML;
    this.children = [];
  }

  setStyle = (payload: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(payload)) this.target.style[key] = value;
  };

  appendChildren = (children: Component[]) => {
    for (const child of children) {
      this.children.push(child);
      this.target.append(child.target);
    }
  };
}

export default Component;
