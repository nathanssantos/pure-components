import Component from '../components/component';
import router from './components/router';

class App extends Component {
  constructor() {
    super({
      style: {
        backgroundColor: 'var(--pc-background)',
        minHeight: '100vh',
      },
      children: {
        router,
      },
    });

    this.appendTo(document.querySelector('#app')!);

    router.navigate();
  }
}

export default new App();
