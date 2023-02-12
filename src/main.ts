import Preview from './components/preview';

class App {
  target = document.querySelector('#app');
  preview = new Preview(this);

  constructor() {
    this.preview.render();
  }
}

new App();

export { App };
