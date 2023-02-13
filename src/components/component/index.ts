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

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { id = uuid, type = 'div', className = `component--${uuid}`, innerHTML = '' } = props;

    this.id = id;
    this.target = document.createElement(type);
    this.target.classList.add('component', className);
    this.target.innerHTML = innerHTML;
    this.target.setAttribute('testid', id);
  }

  setStyle = (payload: Partial<CSSStyleDeclaration>) => {
    for (const [key, value] of Object.entries(payload)) this.target.style[key] = value;
  };

  render = (container: HTMLElement) => {
    container.append(this.target);
  };
}

export default Component;
