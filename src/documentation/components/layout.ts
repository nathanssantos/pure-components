import { Component, Header } from '../..';
import packageJSON from '../../../package.json';

const header = new Header({
  style: {
    zIndex: '20',
  },
  leftContent: {
    innerHTML: 'Pure Components',
    style: {
      fontWeight: 'bold',
      base: {
        fontSize: 'var(--pc-font-size-md)',
      },
      md: {
        fontSize: 'var(--pc-font-size-lg)',
      },
    },
  },
  rightContent: {
    innerHTML: `v${packageJSON.version}`,
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
