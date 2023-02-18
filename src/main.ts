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
        innerHTML: 'Footer',
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
      tagName: 'button',
      innerHTML: 'Open Drawer',
      events: {
        click: drawer.open,
      },
    });

    const modal = new Modal({
      body: {
        innerHTML: 'Body',
      },
      footer: {
        innerHTML: 'Footer',
      },
    });
    const btOpenModal = new Component({
      className: 'bt-open-modal',
      tagName: 'button',
      innerHTML: 'Open Modal',
      events: {
        click: modal.open,
      },
    });

    const avatar = new Avatar({
      image: {
        attributes: {
          src: 'https://i.pravatar.cc/300',
        },
      },
      imageContainer: {
        style: {
          width: '3rem',
          height: '3rem',
        },
      },
      name: {
        innerHTML: 'John Doe',
      },
      description: {
        innerHTML: 'john@doe.com',
      },
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
