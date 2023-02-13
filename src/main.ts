import Drawer from './components/drawer';
import './style.scss';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    document.body.append(new Drawer().target);
  };
}

new App();
