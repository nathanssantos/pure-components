import Avatar from './components/avatar';
import Button from './components/button';
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
      innerHTML: '',
      header: {
        style: {
          backgroundColor: '#2a2a2a',
        },
      },
      body: {
        innerHTML: 'Body',
      },
      footer: {
        innerHTML: 'Footer',
        style: {
          backgroundColor: '#2a2a2a',
        },
      },
    });

    const btOpenDrawer = new Button({
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
        children: {
          btCancel: new Button({
            innerHTML: 'Cancel',
          }),
          btConfirm: new Button({
            innerHTML: 'Confirm',
          }),
        },
      },
    });

    modal.children.content.children.footer.children.btCancel.bindEvents({ click: modal.close });
    modal.children.content.children.footer.children.btConfirm.bindEvents({
      click: () => {
        modal.close();
        console.log('Do something...');
      },
    });

    const btOpenModal = new Button({
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
        alignItems: 'center',
        gap: '0.5rem',
        padding: '2rem',
      },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    }).appendTo(document.body.querySelector('#app')!);
  };
}

new App();

export { Avatar, Component, Drawer, Modal };
