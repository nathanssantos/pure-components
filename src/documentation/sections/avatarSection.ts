import { Avatar, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
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
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Avatar } from '@nathanssantos/pure-components';

new Avatar({
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
}).appendTo(document.body);`,
});

class AvatarSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'avatar',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Avatar' }),
            description: new SectionDescription({
              innerHTML: 'A simple avatar wich contains image, name and description.',
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

export default AvatarSection;
