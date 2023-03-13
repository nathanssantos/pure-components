import Layout from './layout';
import Component from '../../components/component';
import HomeScreen from '../screens/homeScreen';

class Router extends Component {
  readonly initialRoute = 'mainScreen';
  public routes: {
    [name: string]: Route;
  } = {
    mainScreen: {
      component: new HomeScreen(),
      name: 'Home',
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
    for (const screen of Object.values(this.children.layout.children.screens.children)) {
      screen.target.remove();
    }

    this.children.layout.children.screens.appendChildren({
      [screenName]: this.routes[screenName].component,
    });
  };
}

export default new Router();
