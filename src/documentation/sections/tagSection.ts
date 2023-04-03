import { Tag, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    tag: new Tag({
      innerHTML: "I'm a tag",
      style: {
        backgroundColor: 'var(--pc-error)',
      },
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Tag } from '@nathanssantos/pure-components';

new new Tag({
  innerHTML: "I'm a tag",
  style: {
    backgroundColor: 'var(--pc-error)'
  }
}).appendTo(document.body);`,
});

class TagSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'tag',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Tag' }),
            description: new SectionDescription({
              innerHTML: 'A simple tag.',
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

export default TagSection;
