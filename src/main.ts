import Drawer from './components/drawer';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    new Drawer().render();
  };
}

new App();

export default App;
