import Component from '../components/component';
import router from './components/router';
import '../style.scss';
import './demo.scss';

class Demo extends Component {
  constructor() {
    super({
      className: 'demo',
      children: {
        router,
      },
    });

    this.appendTo(document.querySelector('#app')!);

    router.navigate();
  }

  static init = () => {
    new Demo();
  };
}

export default Demo.init();
