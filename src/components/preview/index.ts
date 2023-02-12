import Component from '../component';
import './style.scss';

class Preview extends Component {
  constructor(app: App) {
    super({ app });

    this.render();

    this.target.innerHTML = 'Preview';
  }
}

export default Preview;
