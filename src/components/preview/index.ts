import Avatar from '../avatar';
import Button from '../button';
import Component from '../component';
import Drawer from '../drawer';
import Header from '../header';
import Modal from '../modal';

class Preview extends Component {
  constructor() {
    super({
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
      },
    });

    this.assemble();
  }

  assemble = () => {
    const drawer = new Drawer({
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

    const header = new Header({
      leftContent: {
        children: {
          btOpenDrawer: new Button({
            style: {
              padding: '0.25rem',
            },
            innerHTML:
              '<svg width="1.5rem" height="1.5rem" focusable="false" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>',
            events: {
              click: drawer.open,
            },
          }),
        },
      },
      centerContent: {
        innerHTML: 'Pure Components',
        style: {
          fontWeight: 'bold',
          fontSize: '1.25rem',
          textAlign: 'center',
        },
      },
      rightContent: {
        children: {
          avatar: new Avatar({
            image: {
              attributes: {
                src: 'https://i.pravatar.cc/300',
              },
            },
            name: {
              innerHTML: 'John Doe',
            },
            description: {
              innerHTML: 'john@doe.com',
            },
          }),
        },
      },
    });

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
      style: {
        base: {
          backgroundColor: 'orange',
        },
        sm: {
          backgroundColor: 'blue',
        },
        md: {
          backgroundColor: 'green',
        },
        lg: {
          backgroundColor: 'yellow',
        },
        xl: {
          backgroundColor: 'purple',
        },
      },
    });

    modal.children.content.children.footer.appendChildren({ btCancel, btConfirm });

    this.appendChildren({ header, btOpenModal, drawer, modal });
  };
}

export default Preview;
