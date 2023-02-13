import Drawer from './components/drawer';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    new Drawer().render(document.body);
  };
}

new App();
