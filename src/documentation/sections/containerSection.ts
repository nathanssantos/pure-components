import { Container, Component, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    container: new Container({
      style: {
        base: {
          maxWidth: '17.5rem',
        },
        md: {
          maxWidth: '37.5rem',
        },
      },
      innerHTML:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum? Accusantium culpa incidunt maxime quae natus at placeat itaque error tenetur ab, optio saepe illum soluta porro temporibus. Voluptatum vitae officiis delectus molestiae error fuga eos debitis.',
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Container } from '@nathanssantos/pure-components';

new Container({
  style: {
    base: {
      maxWidth: '17.5rem',
    },
    md: {
      maxWidth: '37.5rem',
    },
  },
  innerHTML:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum? Accusantium culpa incidunt maxime quae natus at placeat itaque error tenetur ab, optio saepe illum soluta porro temporibus. Voluptatum vitae officiis delectus molestiae error fuga eos debitis.',
}).appendTo(document.body);`,
});

class ContainerSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'container',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Container' }),
            description: new SectionDescription({
              innerHTML: 'A simple container.',
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

export default ContainerSection;
