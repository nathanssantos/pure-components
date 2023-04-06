import { Component, Container, Select, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const simpleSelect = new Select({
  field: {
    children: {
      placeholder: new Component({
        tagName: 'option',
        innerHTML: 'Select',
        attributes: { value: '' },
      }),
      option1: new Component({
        tagName: 'option',
        innerHTML: 'Option 1',
        attributes: { value: '1' },
      }),
      option2: new Component({
        tagName: 'option',
        innerHTML: 'Option 2',
        attributes: { value: '2' },
      }),
      option3: new Component({
        tagName: 'option',
        innerHTML: 'Option 3',
        attributes: { value: '3' },
      }),
      option4: new Component({
        tagName: 'option',
        innerHTML: 'Option 4',
        attributes: { value: '4' },
      }),
    },
  },
});

const i18nIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />/svg>';

const selectWithSlots = new Select({
  field: {
    children: {
      option1: new Component({
        tagName: 'option',
        innerHTML: 'Option 1',
        attributes: { value: '1' },
      }),
      option2: new Component({
        tagName: 'option',
        innerHTML: 'Option 2',
        attributes: { value: '2' },
      }),
      option3: new Component({
        tagName: 'option',
        innerHTML: 'Option 3',
        attributes: { value: '3' },
      }),
      option4: new Component({
        tagName: 'option',
        innerHTML: 'Option 4',
        attributes: { value: '4' },
      }),
    },
    attributes: {
      type: 'password',
      value: 'password_here',
    },
    events: {
      input: (_, event: Event) => {
        console.log((event.target as HTMLInputElement).value);
      },
    },
  },
  label: {
    innerHTML: 'Language',
  },
  leftSlot: {
    innerHTML: i18nIcon,
  },
});

const componentExample = new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  children: {
    simpleSelect,
    selectWithSlots,
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Input, Component } from '@nathanssantos/pure-components';

const simpleSelect = new Select({
  field: {
    children: {
      placeholder: new Component({
        tagName: 'option',
        innerHTML: 'Select',
        attributes: { value: '' },
      }),
      option1: new Component({
        tagName: 'option',
        innerHTML: 'Option 1',
        attributes: { value: '1' },
      }),
      option2: new Component({
        tagName: 'option',
        innerHTML: 'Option 2',
        attributes: { value: '2' },
      }),
      option3: new Component({
        tagName: 'option',
        innerHTML: 'Option 3',
        attributes: { value: '3' },
      }),
      option4: new Component({
        tagName: 'option',
        innerHTML: 'Option 4',
        attributes: { value: '4' },
      }),
    },
  },
});

const i18nIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />/svg>';

const selectWithSlots = new Select({
  field: {
    children: {
      option1: new Component({
        tagName: 'option',
        innerHTML: 'Option 1',
        attributes: { value: '1' },
      }),
      option2: new Component({
        tagName: 'option',
        innerHTML: 'Option 2',
        attributes: { value: '2' },
      }),
      option3: new Component({
        tagName: 'option',
        innerHTML: 'Option 3',
        attributes: { value: '3' },
      }),
      option4: new Component({
        tagName: 'option',
        innerHTML: 'Option 4',
        attributes: { value: '4' },
      }),
    },
    attributes: {
      type: 'password',
      value: 'password_here',
    },
    events: {
      input: (_, event: Event) => {
        console.log((event.target as HTMLInputElement).value);
      },
    },
  },
  label: {
    innerHTML: 'Language',
  },
  leftSlot: {
    innerHTML: i18nIcon,
  },
});

document.body.append(
  simpleSelect.target,
  selectWithSlots.target,
);`,
});

class SelectSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'select',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Select' }),
            description: new SectionDescription({
              innerHTML: 'Select with label and slots on both sides.',
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

export default SelectSection;
