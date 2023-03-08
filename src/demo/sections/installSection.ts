import { Component, Container } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

class InstallSection extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: 'Installation' }),
            description: new SectionDescription({
              innerHTML:
                'To use Pure Components in your project, run one of the following commands in your terminal:',
            }),
            codeExampleYarn: new CodeExample({
              innerHTML: 'yarn add @nathanssantos/pure-components',
            }),
            codeExampleNpm: new CodeExample({
              innerHTML: 'npm install @nathanssantos/pure-components',
            }),
          },
        }),
      },
    });
  }
}

export default InstallSection;
