import Component from './components/component';
import Drawer from './components/drawer';
import './style.scss';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    const drawer = new Drawer();
    document.body.append(drawer.target);

    const btOpenDrawer = new Component({
      className: 'bt-open-drawer',
      type: 'button',
      innerHTML: 'Open Drawer',
    });

    document.body.append(btOpenDrawer.target);

    btOpenDrawer.target.addEventListener('click', drawer.open);
  };
}

new App();
