import { Container, Component, Tab, TabPanel, Tabs, Modal, Button } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const modal = new Modal({
  header: {
    innerHTML: 'Modal Header',
    style: {
      justifyContent: 'space-between',
    },
  },
  body: {
    innerHTML: 'Modal Body',
  },
  footer: {
    innerHTML: 'Modal Footer',
  },
});

const button = new Button({ innerHTML: 'Open modal', events: { click: modal.open } });

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    button,
    modal,
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Button, Modal } from '@nathanssantos/pure-components';

const modal = new Modal({
  header: {
    innerHTML: 'Modal Header',
    style: {
      justifyContent: 'space-between',
    },
  },
  body: {
    innerHTML: 'Modal Body',
  },
  footer: {
    innerHTML: 'Modal Footer',
  },
});

modal.appendTo(document.body);

new Button({ innerHTML: 'Open modal', events: { click: modal.open } }).appendTo(document.body);`,
});

class ModalSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'modal',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Modal' }),
            description: new SectionDescription({
              innerHTML: 'A simple modal.',
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

export default ModalSection;
