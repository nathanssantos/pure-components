import { Button, Component, Container } from '../../main';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

class ButtonSection extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Button' }),
            description: new SectionDescription({
              innerHTML: 'A simple button.',
            }),
            componentExamples: new Component({
              style: {
                display: 'flex',
                gap: '1rem',
              },
              children: {
                button: new Button({
                  innerHTML: 'Click me',
                  events: {
                    click: () => alert('Button clicked!'),
                  },
                }),
              },
            }),
            codeExample: new CodeExample({
              innerHTML: `new Button({
  innerHTML: 'Click me',
  events: {
    click: () => alert('Button clicked!'),
  },
})`,
            }),
          },
        }),
      },
    });
  }
}

export default ButtonSection;
