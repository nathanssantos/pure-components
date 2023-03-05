import { Component, Container } from '../..';
import SectionDescription from './sectionDescription';

type HeroProps = {
  title: string;
  description: string;
};

class Hero extends Component {
  constructor(props: Partial<HeroProps>) {
    super({
      children: {
        container: new Container({
          style: {
            gap: '1rem',
            paddingTop: '8rem',
            paddingBottom: '8rem',
          },
          children: {
            title: new Component({
              innerHTML: props.title,
              style: {
                base: {
                  fontSize: '1.85rem',
                },
                md: {
                  fontSize: '2.5rem',
                },
              },
            }),
            description: new SectionDescription({
              innerHTML: props.description,
            }),
          },
        }),
      },
    });
  }
}

export default Hero;
