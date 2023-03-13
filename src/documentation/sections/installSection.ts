import { Component, Container } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

class InstallSection extends Component {
  constructor() {
    super({
      attributes: {
        id: 'install',
      },
      style: {
        paddingTop: '4rem',
      },
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
              style: {
                marginBottom: '1rem',
              },
            }),
            codeExampleNpm: new CodeExample({
              innerHTML: 'npm install @nathanssantos/pure-components',
              style: {
                marginBottom: '1rem',
              },
            }),
            description2: new SectionDescription({
              innerHTML: "Import styles in your app's entry point:",
            }),
            styleImport: new CodeExample({
              innerHTML: 'import "@nathanssantos/pure-components/style.css";',
              style: {
                marginBottom: '3rem',
              },
            }),
          },
        }),
      },
    });
  }
}

export default InstallSection;
