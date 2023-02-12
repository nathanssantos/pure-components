import Component from '../component';
import './style.scss';

const innerHTML = `
  <div>Drawer</div>
`;

class Drawer extends Component {
  constructor() {
    super({ className: 'drawer', innerHTML });
  }
}

export default Drawer;
