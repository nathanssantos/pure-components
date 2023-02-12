import Preview from './components/preview';

class App {
  target = document.querySelector('#app');
  preview = new Preview(this);

  init = () => {
    this.preview.render();
  };
}

new App().init();

export { App };
