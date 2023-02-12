class App {
  constructor() {
    this.renderPreview();
  }

  renderPreview = () => {
    document.body.innerHTML = 'Preview';
  };
}

new App();

export { App };
