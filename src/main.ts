import Component from './components/component';
import Drawer from './components/drawer';
import Modal from './components/modal';
import './style.scss';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    // Drawer
    const drawer = new Drawer({
      bodyInnerHTML: `
        <nav class="menu" style="color: var(--text-color);">
          <ul style="list-style: none; padding: 0; margin: 0;">
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
      `,
      footerInnerHTML: `
        <div>Footer</div>
      `,
    });
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

    // Modal
    const modal = new Modal({
      bodyInnerHTML: `
        <div>Body</div>
      `,
      footerInnerHTML: `
        <div>Footer</div>
      `,
    });
    document.body.append(modal.target);
    const btOpenmodal = new Component({
      className: 'bt-open-modal',
      type: 'button',
      innerHTML: 'Open modal',
    });
    document.body.append(btOpenmodal.target);
    btOpenmodal.target.addEventListener('click', modal.open);
  };
}

new App();
