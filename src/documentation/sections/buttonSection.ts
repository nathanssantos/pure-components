import { Button, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    button: new Button({
      innerHTML: 'Click me',
      events: {
        click: () => alert('Button clicked!'),
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
}).appendTo(document.body);`,
});

class ButtonSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'button',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Button' }),
            description: new SectionDescription({
              innerHTML: 'A simple button.',
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

export default ButtonSection;
