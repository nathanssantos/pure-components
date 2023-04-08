import { Checkbox, Component, Container, Tab, TabPanel, Tabs } from '../..';
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
    checkbox1: new Checkbox({
      label: {
        innerHTML: 'Option 1',
      },
      field: {
        attributes: {
          name: 'checkbox-example-1',
        },
      },
    }),
    checkbox2: new Checkbox({
      label: {
        innerHTML: 'Option 2',
      },
      field: {
        attributes: {
          name: 'checkbox-example-2',
        },
      },
    }),
    checkbox3: new Checkbox({
      label: {
        innerHTML: 'Option 3',
      },
      field: {
        attributes: {
          name: 'checkbox-example-3',
        },
      },
    }),
    checkbox4: new Checkbox({
      label: {
        innerHTML: 'Option 4',
      },
      field: {
        attributes: {
          name: 'checkbox-example-4',
        },
      },
    }),
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Component, Checkbox } from '@nathanssantos/pure-components';

new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  children: {
    checkbox1: new Checkbox({
      label: {
        innerHTML: 'Option 1',
      },
      field: {
        attributes: {
          name: 'checkbox-example-1',
        },
      },
    }),
    checkbox2: new Checkbox({
      label: {
        innerHTML: 'Option 2',
      },
      field: {
        attributes: {
          name: 'checkbox-example-2',
        },
      },
    }),
    checkbox3: new Checkbox({
      label: {
        innerHTML: 'Option 3',
      },
      field: {
        attributes: {
          name: 'checkbox-example-3',
        },
      },
    }),
    checkbox4: new Checkbox({
      label: {
        innerHTML: 'Option 4',
      },
      field: {
        attributes: {
          name: 'checkbox-example-4',
        },
      },
    }),
  },
}).appendTo(document.body);`,
});

class CheckboxSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'checkbox',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Checkbox' }),
            description: new SectionDescription({
              innerHTML: 'A simple checkbox input.',
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

export default CheckboxSection;
