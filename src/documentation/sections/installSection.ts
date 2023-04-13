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
              content: '$ yarn add @nathanssantos/pure-components',
              language: 'bash',
              style: {
                marginBottom: '1rem',
              },
            }),
            codeExampleNpm: new CodeExample({
              content: '$ npm install @nathanssantos/pure-components',
              language: 'bash',
              style: {
                marginBottom: '3rem',
              },
            }),
            description2: new SectionDescription({
              innerHTML: "Import styles in your app's entry point:",
            }),
            styleImport: new CodeExample({
              content: 'import "@nathanssantos/pure-components/style.css";',
              style: {
                marginBottom: '3rem',
              },
            }),
            description3: new SectionDescription({
              innerHTML: 'Import Inter font:',
            }),
            fontImport: new CodeExample({
              content: `&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"&gt;`,
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
