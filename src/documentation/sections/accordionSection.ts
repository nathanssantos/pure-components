import { Accordion, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    maxWidth: '20rem',
  },
  children: {
    accordion: new Accordion({
      header: {
        innerHTML: 'Accordion Header',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML: 'Accordion Content',
      },
    }),
    accordion_1: new Accordion({
      header: {
        innerHTML: 'Accordion Item 1',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_2: new Accordion({
      header: {
        innerHTML: 'Accordion Item 2',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_3: new Accordion({
      isOpen: true,
      header: {
        innerHTML: 'Accordion Item 3',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_4: new Accordion({
      header: {
        innerHTML: 'Accordion Item 4',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_5: new Accordion({
      header: {
        innerHTML: 'Accordion Item 5',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Accordion, Component } from '@nathanssantos/pure-components';

new Component({
  style: {
    maxWidth: '20rem',
  },
  children: {
    accordion: new Accordion({
      header: {
        innerHTML: 'Accordion Header',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML: 'Accordion Content',
      },
    }),
    accordion_1: new Accordion({
      header: {
        innerHTML: 'Accordion Item 1',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_2: new Accordion({
      header: {
        innerHTML: 'Accordion Item 2',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_3: new Accordion({
      isOpen: true,
      header: {
        innerHTML: 'Accordion Item 3',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_4: new Accordion({
      header: {
        innerHTML: 'Accordion Item 4',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_5: new Accordion({
      header: {
        innerHTML: 'Accordion Item 5',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
  },
}).appendTo(document.body);`,
});

class AccordionSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'accordion',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Accordion' }),
            description: new SectionDescription({
              innerHTML: 'A simple accordion component.',
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

export default AccordionSection;
