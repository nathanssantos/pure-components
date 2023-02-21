import Button from '../../components/button';
import Modal from '../../components/modal';
import { Component } from '../../main';

class ComponentsScreen extends Component {
  constructor() {
    super({
      style: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        gap: '0.5rem',
        width: '100%',
      },
    });

    this.assemble();
  }

  assemble = () => {
    const modal = new Modal({
      body: {
        innerHTML: 'Body',
      },
    });
    const btCancel = new Button({
      innerHTML: 'Cancel',
      events: {
        click: modal.close,
      },
    });
    const btConfirm = new Button({
      innerHTML: 'Confirm',
      events: {
        click: () => {
          modal.close();
          console.log('Do something...');
        },
      },
    });
    const btOpenModal = new Button({
      innerHTML: 'Open Modal',
      events: {
        click: modal.open,
      },
    });

    modal.children.content.children.footer.appendChildren({ btCancel, btConfirm });

    this.appendChildren({ btOpenModal, modal });
  };
}

export default ComponentsScreen;
