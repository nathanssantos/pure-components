import { Avatar, Button, Component, Container, Header, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    header: new Header({
      style: {
        position: 'relative',
      },
      leftContent: {
        children: {
          button: new Button({
            style: {
              padding: '0.5rem',
            },
            innerHTML:
              '<svg viewBox="0 0 24 24" style="height: 1.25rem; width: 1.25rem;"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>',
          }),
        },
      },
      centerContent: {
        innerHTML: 'Center Content',
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
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Avatar, Button, Header } from '@nathanssantos/pure-components';

new Header({
  style: {
    position: 'relative',
  },
  leftContent: {
    children: {
      button: new Button({
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          '<svg viewBox="0 0 24 24" style="height: 1.25rem; width: 1.25rem;"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>',
      }),
    },
  },
  centerContent: {
    innerHTML: 'Center Content',
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
}).appendTo(document.body);`,
});

class HeaderSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'header',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Header' }),
            description: new SectionDescription({
              innerHTML: 'A simple header.',
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

export default HeaderSection;
