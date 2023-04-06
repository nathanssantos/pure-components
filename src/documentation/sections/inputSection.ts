import { Component, Container, Input, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const simpleInput = new Input({
  field: {
    attributes: {
      value: 'Simple Input',
    },
  },
  style: {
    minWidth: '10rem',
  },
});

const lockIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>';

const visibilityOnIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';

const visibilityOffIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>';

const btToggleInputType = new Component({
  innerHTML: visibilityOffIcon,
  style: {
    display: 'flex',
    padding: '0.5rem',
    cursor: 'pointer',
  },
});

const passwordInput = new Input({
  field: {
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
    innerHTML: 'Password',
  },
  leftSlot: {
    innerHTML: lockIcon,
  },
  rightSlot: {
    children: {
      btToggleInputType,
    },
  },
  style: {
    minWidth: '10rem',
  },
});

const handleToggleInputType = (button: Component) => {
  const inputField = passwordInput.children.fieldWrapper.children.field;
  const currentInputType = inputField.target.getAttribute('type');

  inputField.setAttributes({ type: currentInputType === 'password' ? 'text' : 'password' });

  button.target.innerHTML =
    currentInputType === 'password' ? visibilityOnIcon : visibilityOffIcon;
};

btToggleInputType.bindEvents({
  click: handleToggleInputType,
});

const componentExample = new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  children: {
    simpleInput,
    passwordInput,
  },
});

const codeExample = new CodeExample({
  language: 'typescript',
  content: `import { Input, Component } from '@nathanssantos/pure-components';

const simpleInput = new Input({
  field: {
    attributes: {
      value: 'Simple Input',
    },
  },
});

const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>';

const visibilityOnIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';

const visibilityOffIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>';

const btToggleInputType = new Component({
  innerHTML: visibilityOffIcon,
  style: {
    display: 'flex',
    padding: '0.5rem',
    cursor: 'pointer',
  },
});

const passwordInput = new Input({
  field: {
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
    innerHTML: 'Password',
  },
  leftSlot: {
    innerHTML: lockIcon,
  },
  rightSlot: {
    children: {
      btToggleInputType,
    },
  },
});

const handleToggleInputType = (button: Component) => {
  const inputField = passwordInput.children.fieldWrapper.children.field;
  const currentInputType = inputField.target.getAttribute('type');

  inputField.setAttributes({ type: currentInputType === 'password' ? 'text' : 'password' });

  button.target.innerHTML =
    currentInputType === 'password' ? visibilityOnIcon : visibilityOffIcon;
};

btToggleInputType.bindEvents({
  click: handleToggleInputType,
});

document.body.append(
  simpleInput.target,
  passwordInput.target,
);`,
});

class InputSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'input',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Input' }),
            description: new SectionDescription({
              innerHTML: 'Input with label and slots on both sides.',
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

export default InputSection;
