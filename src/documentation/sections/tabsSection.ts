import { Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    tabs: new Tabs({
      tabList: {
        children: {
          tab1: new Tab({
            innerHTML: 'Tab 1',
          }),
          tab2: new Tab({
            innerHTML: 'Tab 2',
          }),
          tab3: new Tab({
            innerHTML: 'Tab 3',
          }),
        },
      },
      tabPanels: {
        children: {
          panel1: new TabPanel({
            innerHTML: 'TabPanel 1',
          }),
          panel2: new TabPanel({
            innerHTML: 'TabPanel 2',
          }),
          panel3: new TabPanel({
            innerHTML: 'TabPanel 3',
          }),
        },
      },
    }),
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Tab, TabPanel, Tabs } from '@nathanssantos/pure-components';

new Tabs({
  tabList: {
    children: {
      tab1: new Tab({
        innerHTML: 'Tab 1',
      }),
      tab2: new Tab({
        innerHTML: 'Tab 2',
      }),
      tab3: new Tab({
        innerHTML: 'Tab 3',
      }),
    },
  },
  tabPanels: {
    children: {
      panel1: new TabPanel({
        innerHTML: 'TabPanel 1',
      }),
      panel2: new TabPanel({
        innerHTML: 'TabPanel 2',
      }),
      panel3: new TabPanel({
        innerHTML: 'TabPanel 3',
      }),
    },
  },
})`,
});

class TabsSection extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Tabs' }),
            description: new SectionDescription({
              innerHTML: 'A simple tabs component.',
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

export default TabsSection;
