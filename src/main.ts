import Avatar from './components/avatar';
import Component from './components/component';
import Drawer from './components/drawer';
import Modal from './components/modal';
import './style.scss';

class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    const drawer = new Drawer({
      header: {
        style: {
          backgroundColor: '#2a2a2a',
        },
      },
      body: {
        innerHTML: `
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
      },
      footer: {
        innerHTML: `
          <div>Footer</div>
        `,
        style: {
          backgroundColor: '#2a2a2a',
        },
      },
    });
    drawer.target
      .querySelectorAll('.menu__item')
      .forEach((link) => link.addEventListener('click', drawer.close));
    const btOpenDrawer = new Component({
      className: 'bt-open-drawer',
      type: 'button',
      innerHTML: 'Open Drawer',
      events: {
        click: drawer.open,
      },
    });

    const modal = new Modal({
      body: {
        innerHTML: `
          <div>Body</div>
        `,
      },
      footer: {
        innerHTML: `
          <div>Footer</div>
        `,
      },
    });
    const btOpenModal = new Component({
      className: 'bt-open-modal',
      type: 'button',
      innerHTML: 'Open Modal',
      events: {
        click: modal.open,
      },
    });

    const avatar = new Avatar({
      src: 'https://i.pravatar.cc/300',
      name: 'John Doe',
      description: 'john@doe.com',
    });

    new Component({
      children: { btOpenDrawer, btOpenModal, avatar, drawer, modal },
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '2rem',
      },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    }).appendTo(document.body.querySelector('#app')!);
  };
}

new App();
