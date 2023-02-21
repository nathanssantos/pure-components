import { Component, Container } from '../../main';

class Hero extends Component {
  constructor() {
    super({
      children: {
        container: new Container({
          innerHTML: 'Hero',
          style: {
            minHeight: '32rem',
          },
        }),
      },
    });
  }
}

export default Hero;
