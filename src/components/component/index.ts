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
  type: string;
  target: HTMLElement;

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { id = uuid, type = 'div', className = `component--${uuid}`, innerHTML = '' } = props;

    this.id = id;
    this.type = type;
    this.target = document.createElement(type);
    this.target.classList.add('component', className);
    this.target.setAttribute('data-testid', id);
    this.target.setAttribute('data-testid', id);
    this.setInnerHTML(innerHTML);
  }

  setInnerHTML = (content: string) => {
    this.target.innerHTML = content;
  };

  render = (target = document.body) => {
    target.append(this.target);
  };
}

export default Component;
