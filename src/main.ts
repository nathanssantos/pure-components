import Drawer from './components/drawer';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    document.body.append(new Drawer().target);
  };
}

new App();
