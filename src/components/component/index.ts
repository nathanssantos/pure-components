import generateUUID from '../../utils/generateUUID';
import './style.scss';

type ComponentConstructorProps = {
  id?: string;
  type?: string;
  className?: string;
  innerHTML?: string;
};

class Component {
  id: string;
  target: HTMLElement;
  children: Component[];

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { id, type = 'div', className, innerHTML = '' } = props;

    this.id = id || uuid;
    this.target = document.createElement(type);
    if (id) this.target.setAttribute('id', id);
    if (className?.length) this.target.classList.add(className);
    this.target.innerHTML = innerHTML;
    this.children = [];
  }

  setStyle = (payload: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(payload)) this.target.style[key] = value;
  };

  appendChild = (child: Component) => {
    this.children.push(child);
    this.target.append(child.target);
  };
}

export default Component;
