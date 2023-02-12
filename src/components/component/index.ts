import { App } from '../../main';
import generateUUID from '../../utils/generateUUID';
import './style.scss';

type ComponentConstructorProps = {
  app?: App;
  id?: string;
  type?: string;
  className?: string;
};

class Component {
  app: App;
  id: string;
  type: string;
  className: string;
  target: HTMLElement;

  constructor(props: ComponentConstructorProps = {}) {
    const uuid = generateUUID();

    const { app, id = uuid, type = 'div', className = `component--${uuid}` } = props;

    this.app = app || new App();
    this.id = id;
    this.type = type;
    this.className = className;
    this.target = document.createElement(type);

    this.prepare();
  }

  prepare = () => {
    this.target.classList.add('component', this.className);
    this.target.setAttribute('data-testid', this.id);
  };

  render = (target = document.body) => {
    target.append(this.target);
  };
}

export default Component;
