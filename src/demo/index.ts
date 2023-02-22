import Component from '../components/component';
import router from './components/router';

class App extends Component {
  constructor() {
    super({
      style: {
        minHeight: '100vh',
        backgroundColor: 'var(--pc-background)',
        color: 'var(--pc-text-color)',
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
