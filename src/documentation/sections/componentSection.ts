import { Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  innerHTML: "I'm a generic component.",
  style: {
    backgroundColor: 'lightgreen',
    padding: '1.5rem',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    textAlign: 'center',
  },
  events: {
    click: ({ setStyle, target }) => {
      target.innerHTML = 'I can do anything.';
      setStyle({ backgroundColor: 'lightblue' });
    },
    mouseleave: ({ setStyle, target }) => {
      target.innerHTML = "I'm a generic component.";
      setStyle({ backgroundColor: 'lightgreen' });
    },
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Component } from '@nathanssantos/pure-components';

new Component({
  innerHTML: "I'm a generic component.",
  style: {
    backgroundColor: 'lightgreen',
    padding: '1.5rem',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    textAlign: 'center',
  },
  events: {
    click: ({ setStyle, target }) => {
      target.innerHTML = 'I can do anything.';
      setStyle({ backgroundColor: 'lightblue' });
    },
    mouseleave: ({ setStyle, target }) => {
      target.innerHTML = "I'm a generic component.";
      setStyle({ backgroundColor: 'lightgreen' });
    },
  },
}).appendTo(document.body);`,
});

class ComponentSection extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Component' }),
            description: new SectionDescription({
              innerHTML: 'A generic component that can be anything.',
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

export default ComponentSection;
