import { Component, Header } from '../..';

class Layout extends Component {
  constructor() {
    const header = new Header({
      leftContent: {
        children: {
          logo: new Component({
            innerHTML: 'Pure Components',
            style: {
              fontWeight: 'bold',
              base: {
                fontSize: '1rem',
              },
              md: {
                fontSize: '1.25rem',
              },
            },
          }),
        },
      },
    });

    super({
      className: 'layout',
      children: {
        header,
        screens: new Component(),
      },
    });
  }
}

export default Layout;
