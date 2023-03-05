import { Tabs, Component, Container } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    button: new Tabs({
      innerHTML: 'Click me',
      events: {
        click: () => alert('Button clicked!'),
      },
    }),
  },
});

const codeExample = new CodeExample({
  innerHTML: `new Tabs({
  innerHTML: 'Click me',
  events: {
    click: () => alert('Tabs clicked!'),
  },
})`,
});

class TabsSection extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Tabs' }),
            description: new SectionDescription({
              innerHTML: 'A simple tabs component.',
            }),
            componentExample,
            codeExample,
          },
        }),
      },
    });
  }
}

export default TabsSection;
