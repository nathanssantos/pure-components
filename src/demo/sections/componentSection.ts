import { Component, Container } from '../..';
import CodeExample from '../components/codeExample';
import SectionDescription from '../components/sectionDescription';
import SectionTitle from '../components/sectionTitle';

const componentExample = new Component({
  style: {
    display: 'flex',
    gap: '1rem',
  },
  children: {
    component: new Component({
      innerHTML: "I'm a Component.",
      style: {
        backgroundColor: 'lightskyblue',
        padding: '2rem',
        color: '#222',
        fontWeight: 'bold',
        borderRadius: '0.25rem',
        textAlign: 'center',
      },
      children: {
        otherComponent: new Component({
          innerHTML: 'Other Component',
          style: {
            backgroundColor: 'coral',
            padding: '2rem',
            borderRadius: '0.25rem',
            marginTop: '2rem',
          },
        }),
      },
      events: {
        click: (instance) => {
          instance.setStyle({ backgroundColor: 'tomato' });
        },
        mouseout: (instance) => {
          instance.setStyle({ backgroundColor: 'lightskyblue' });
        },
      },
    }),
  },
});

const codeExample = new CodeExample({
  innerHTML: `new Component({
  innerHTML: "I'm a Component.",
  style: {
    backgroundColor: 'lightskyblue',
    padding: '2rem',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    textAlign: 'center',
  },
  children: {
    otherComponent: new Component({
      innerHTML: 'Other Component',
      style: {
        backgroundColor: 'coral',
        padding: '2rem',
        borderRadius: '0.25rem',
        marginTop: '2rem',
      },
    }),
  },
  events: {
    click: (instance) => {
      instance.setStyle({ backgroundColor: 'tomato' });
    },
    mouseout: (instance) => {
      instance.setStyle({ backgroundColor: 'lightskyblue' });
    },
  },
})`,
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
            componentExample,
            codeExample,
          },
        }),
      },
    });
  }
}

export default ComponentSection;
