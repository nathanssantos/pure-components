import Component from '../../components/component';
import ComponentsScreen from '../screens/componentsScreen';
import GetStartedScreen from '../screens/getStartedScreen';
import Layout from './layout';

class Router extends Component {
  readonly initialRoute = 'components';
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
    for (const [name, child] of Object.entries(this.children.layout.children)) {
      if (name !== 'header' && name !== 'drawer') child.destroy();
    }

    this.children.layout.appendChildren({ [screenName]: this.routes[screenName].component });
  };
}

export default new Router();
