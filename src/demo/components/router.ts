import Component from '../../components/component';
import ComponentsScreen from '../screens/componentsScreen';
import GetStartedScreen from '../screens/getStartedScreen';
import Layout from './layout';

class Router extends Component {
  readonly initialRoute = 'getStarted';
  public routes: {
    [name: string]: Route;
  } = {
    components: {
      component: new ComponentsScreen(),
      name: 'Components',
    },
    getStarted: {
      component: new GetStartedScreen(),
      name: 'Get Started',
    },
  };

  constructor() {
    super({
      className: 'router',
      children: {
        layout: new Layout(),
      },
    });
  }

  public navigate = (screenName: string = this.initialRoute) => {
    for (const child of Object.values(this.children)) {
      if (!child.target.className.includes('layout')) child.destroy();
    }

    this.appendChildren({ [screenName]: this.routes[screenName].component });
  };
}

export default new Router();
