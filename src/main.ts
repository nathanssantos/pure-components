import Component from './components/component';
import Drawer from './components/drawer';
import './style.scss';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    const drawer = new Drawer();
    drawer.children.content.children.body.target.innerHTML = `
      <nav class="menu" style="color: var(--text-color);">
        <ul style="list-style: none;">
          <li class="menu__item" style="cursor: pointer;">
            Item 1
          </li>
          <li class="menu__item" style="cursor: pointer;">
            Item 2
          </li>
          <li class="menu__item" style="cursor: pointer;">
            Item 3
          </li>
        </ul>
      </nav>
    `;

    drawer.target
      .querySelectorAll('.menu__item')
      .forEach((link) => link.addEventListener('click', drawer.close));
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
