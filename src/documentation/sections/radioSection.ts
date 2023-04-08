import { Radio, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  children: {
    radio1: new Radio({
      label: {
        innerHTML: 'Option 1',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio2: new Radio({
      label: {
        innerHTML: 'Option 2',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio3: new Radio({
      label: {
        innerHTML: 'Option 3',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio4: new Radio({
      label: {
        innerHTML: 'Option 4',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Component, Radio } from '@nathanssantos/pure-components';

new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  children: {
    radio1: new Radio({
      label: {
        innerHTML: 'Option 1',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio2: new Radio({
      label: {
        innerHTML: 'Option 2',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio3: new Radio({
      label: {
        innerHTML: 'Option 3',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio4: new Radio({
      label: {
        innerHTML: 'Option 4',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
  },
}).appendTo(document.body);`,
});

class RadioSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'radio',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Radio' }),
            description: new SectionDescription({
              innerHTML: 'A simple radio input.',
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

export default RadioSection;
