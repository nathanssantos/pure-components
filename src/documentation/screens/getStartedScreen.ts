import { Component } from '../..';
import Hero from '../components/hero';
import InstallSection from '../sections/installSection';

class GetStartedScreen extends Component {
  constructor() {
    super({
      style: {
        paddingBottom: '6rem',
      },
      children: {
        hero: new Hero({ title: 'Get Started' }),
        installSection: new InstallSection(),
      },
    });
  }
}

export default GetStartedScreen;
