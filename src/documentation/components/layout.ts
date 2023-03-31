import { Component, Header } from '../..';

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

class Layout extends Component {
  constructor() {
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
