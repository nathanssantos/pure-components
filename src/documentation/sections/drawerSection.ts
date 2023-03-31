import { Container, Component, Tab, TabPanel, Tabs, Drawer, Button } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const drawer = new Drawer({
  header: {
    innerHTML: 'Drawer Header',
    style: {
      justifyContent: 'space-between',
    },
  },
  body: {
    innerHTML: 'Drawer Body',
  },
  footer: {
    innerHTML: 'Drawer Footer',
  },
});

const button = new Button({ innerHTML: 'Open Drawer', events: { click: drawer.open } });

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    button,
    drawer,
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Button, Drawer } from '@nathanssantos/pure-components';

const drawer = new Drawer({
  header: {
    innerHTML: 'Drawer Header',
    style: {
      justifyContent: 'space-between',
    },
  },
  body: {
    innerHTML: 'Drawer Body',
  },
  footer: {
    innerHTML: 'Drawer Footer',
  },
});

drawer.appendTo(document.body);

new Button({ innerHTML: 'Open Drawer', events: { click: drawer.open } }).appendTo(document.body);`,
});

class DrawerSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'drawer',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Drawer' }),
            description: new SectionDescription({
              innerHTML: 'A simple drawer.',
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

export default DrawerSection;
