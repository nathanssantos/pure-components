import Component from '../components/component';
import router from './components/router';
import '../style.scss';
import './style.scss';

class Documentation extends Component {
  constructor() {
    super({
      className: 'documentation',
      children: {
        router,
      },
    });

    this.appendTo(document.querySelector('#app')!);

    router.navigate();
  }

  static init = () => {
    new Documentation();
  };
}

export default Documentation.init();
