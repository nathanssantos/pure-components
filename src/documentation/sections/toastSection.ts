import { Button, Component, Container, Tab, TabPanel, Tabs } from '../..';
import Toast from '../../components/toast';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const controlledToast = new Toast({
  title: {
    innerHTML: 'Toast',
  },
  description: {
    innerHTML: 'Controlled toast',
  },
});

const componentExample = new Component({
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  children: {
    positioning: new Component({
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'calc(var(--pc-spacing) * 2)',
      },
      children: {
        title: new Component({
          innerHTML: 'Positions',
          style: { width: '100%' },
        }),
        toastTopLeft: new Button({
          innerHTML: 'top-left',
          events: {
            click: () =>
              Toast.trigger({
                position: 'top-left',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Toast top left position and animation.',
                },
              }),
          },
        }),
        toastTopCenter: new Button({
          innerHTML: 'top-center',
          events: {
            click: () =>
              Toast.trigger({
                position: 'top-center',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Toast top center position and animation.',
                },
              }),
          },
        }),
        toastTopRight: new Button({
          innerHTML: 'top-right',
          events: {
            click: () =>
              Toast.trigger({
                position: 'top-right',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Toast top right position and animation.',
                },
              }),
          },
        }),
        toastBottomLeft: new Button({
          innerHTML: 'bottom-left',
          events: {
            click: () =>
              Toast.trigger({
                position: 'bottom-left',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Toast bottom left position and animation.',
                },
              }),
          },
        }),
        toastBottomCenter: new Button({
          innerHTML: 'bottom-center',
          events: {
            click: () =>
              Toast.trigger({
                position: 'bottom-center',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Toast bottom center position and animation.',
                },
              }),
          },
        }),
        toastBottomRight: new Button({
          innerHTML: 'bottom-right',
          events: {
            click: () =>
              Toast.trigger({
                position: 'bottom-right',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Toast bottom right position and animation.',
                },
              }),
          },
        }),
      },
    }),
    variants: new Component({
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'calc(var(--pc-spacing) * 2)',
      },
      children: {
        title: new Component({
          innerHTML: 'Variants',
          style: { width: '100%' },
        }),
        toastVariantInfo: new Button({
          innerHTML: 'info',
          style: {
            backgroundColor: 'var(--pc-info)',
          },
          events: {
            click: () => {
              Toast.trigger({
                variant: 'info',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Info',
                },
              });
            },
          },
        }),
        toastVariantSuccess: new Button({
          innerHTML: 'success',
          style: {
            backgroundColor: 'var(--pc-success)',
          },
          events: {
            click: () =>
              Toast.trigger({
                variant: 'success',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Success',
                },
              }),
          },
        }),
        toastVariantWarning: new Button({
          innerHTML: 'warning',
          style: {
            backgroundColor: 'var(--pc-warning)',
          },
          events: {
            click: () =>
              Toast.trigger({
                variant: 'warning',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Warning',
                },
              }),
          },
        }),
        toastVariantError: new Button({
          innerHTML: 'error',
          style: {
            backgroundColor: 'var(--pc-error)',
          },
          events: {
            click: () =>
              Toast.trigger({
                variant: 'error',
                title: {
                  innerHTML: 'Toast',
                },
                description: {
                  innerHTML: 'Error',
                },
              }),
          },
        }),
      },
    }),
    controlled: new Component({
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'calc(var(--pc-spacing) * 2)',
      },
      children: {
        title: new Component({
          innerHTML: 'Controlled',
          style: { width: '100%' },
        }),
        controlletToastShow: new Button({
          innerHTML: 'Show controlled toast',
          events: {
            click: controlledToast.show,
          },
        }),
        controlletToastDismiss: new Button({
          innerHTML: 'Dismiss controlled toast',
          events: {
            click: controlledToast.dismiss,
          },
        }),
      },
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Button, Toast } from '@nathanssantos/pure-components';

const btTriggerToast = new Button({
  innerHTML: 'Toast top right',
  events: {
    click: () => {
      Toast.trigger({
        position: 'top-right',
        variant: 'success',
        title: {
          innerHTML: 'Toast',
        },
        description: {
          innerHTML: 'Toast top right position and animation.',
        },
      }),
    }
  },
});

const controlledToast = new Toast({
  title: {
    innerHTML: 'Toast',
  },
  description: {
    innerHTML: 'Toast top left position and controlled animation.',
  },
});

const btShowControlledToast = new Button({
  innerHTML: 'Show controlled toast',
  events: {
    click: controlledToast.show,
  },
});

const btDismissControlledToast = new Button({
  innerHTML: 'Dismiss controlled toast',
  events: {
    click: controlledToast.dismiss,
  },
});

document.body.append(
  btTriggerToast.target,
  btShowControlledToast.target,
  btDismissControlledToast.target
);`,
});

class ToastSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'toast',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Toast' }),
            description: new SectionDescription({
              innerHTML: 'A super toast.',
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: 'Usage',
                  }),
                  tab2: new Tab({
                    innerHTML: 'Props',
                  }),
                },
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: '1rem',
                    },
                    children: {
                      componentExample,
                      codeExample,
                    },
                  }),
                  panel2: new TabPanel({
                    innerHTML: 'Coming soon.',
                  }),
                },
              },
            }),
          },
        }),
      },
    });
  }
}

export default ToastSection;
