import { Progress, Component, Container, Tab, TabPanel, Tabs } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const progress = new Progress();

progress.setValue(42);

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    progress,
  },
});

const codeExample = new CodeExample({
  innerHTML: `import { Progress } from '@nathanssantos/pure-components';

const progress = new Progress();

progress.setValue(42);

progress.appendTo(document.body);`,
});

class ProgressSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'progress',
      },
      style: {
        paddingTop: '4rem',
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Progress' }),
            description: new SectionDescription({
              innerHTML: 'A simple progress bar.',
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

export default ProgressSection;
