import { Breadcrumbs, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Breadcrumbs({
  children: {
    item1: new Component({
      innerHTML: 'Home',
      style: {
        fontWeight: '700',
      },
    }),
    item2: 'Route A',
    item3: 'Route B',
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Breadcrumbs } from '@nathanssantos/pure-components';

new Breadcrumbs({
  children: {
    item1: new Component({
      innerHTML: 'Home',
      style: {
        fontWeight: '700',
      },
    }),
    item2: 'Route A',
    item3: 'Route B',
  },
}).appendTo(document.body);`,
});

class BreadcrumbsSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'breadcrumbs',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Breadcrumbs' }),
            description: new SectionDescription({
              innerHTML: 'A simple breadcrumbs component.',
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

export default BreadcrumbsSection;
