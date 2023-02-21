import { Component } from '../../main';
import Hero from '../sections/hero';

class GetStartedScreen extends Component {
  constructor() {
    super({
      children: {
        hero: new Hero(),
      },
    });
  }
}

export default GetStartedScreen;
