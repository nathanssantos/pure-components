import { Button, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';
import { toast } from '../../components/toast';

const componentExample = new Component({
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  children: {
    toastTopLeft: new Button({
      innerHTML: 'Toast top left',
      events: {
        click: () =>
          toast({
            position: 'top-left',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast top left position and animation',
            },
          }),
      },
    }),
    toastTopCenter: new Button({
      innerHTML: 'Toast top center',
      events: {
        click: () =>
          toast({
            position: 'top-center',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast top center position and animation',
            },
          }),
      },
    }),
    toastTopRight: new Button({
      innerHTML: 'Toast top right',
      events: {
        click: () =>
          toast({
            position: 'top-right',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast top right position and animation',
            },
          }),
      },
    }),
    toastBottomLeft: new Button({
      innerHTML: 'Toast bottom left',
      events: {
        click: () =>
          toast({
            position: 'bottom-left',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast bottom left position and animation',
            },
          }),
      },
    }),
    toastBottomCenter: new Button({
      innerHTML: 'Toast bottom center',
      events: {
        click: () =>
          toast({
            position: 'bottom-center',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast bottom center position and animation',
            },
          }),
      },
    }),
    toastBottomRight: new Button({
      innerHTML: 'Toast bottom right',
      events: {
        click: () =>
          toast({
            position: 'bottom-right',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast bottom right position and animation',
            },
          }),
      },
    }),
    toastVariantSuccess: new Button({
      innerHTML: 'Toast Success',
      style: {
        backgroundColor: 'green',
      },
      events: {
        click: () =>
          toast({
            position: 'bottom-left',
            variant: 'success',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast Success',
            },
          }),
      },
    }),
    toastVariantError: new Button({
      innerHTML: 'Toast Error',
      style: {
        backgroundColor: 'red',
      },
      events: {
        click: () =>
          toast({
            position: 'bottom-left',
            variant: 'error',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast Error',
            },
          }),
      },
    }),
    toastVariantWarning: new Button({
      innerHTML: 'Toast Warning',
      style: {
        backgroundColor: 'yellow',
      },
      events: {
        click: () =>
          toast({
            position: 'bottom-left',
            variant: 'warning',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast Warning',
            },
          }),
      },
    }),
    toastVariantInfo: new Button({
      innerHTML: 'Toast Info',
      style: {
        backgroundColor: 'purple',
      },
      events: {
        click: () =>
          toast({
            position: 'bottom-left',
            variant: 'info',
            title: {
              innerHTML: 'Toast',
            },
            description: {
              innerHTML: 'Toast Info',
            },
          }),
      },
    }),
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Button } from '@nathanssantos/pure-components';

new Button({
  innerHTML: 'Click me',
  events: {
    click: () => alert('Button clicked!'),
  },
})`,
});

class ToastSection extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Toast' }),
            description: new SectionDescription({
              innerHTML: 'A super toast',
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
