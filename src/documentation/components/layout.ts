import router from './router';
import { Button, Component, Drawer, Header } from '../..';

class Layout extends Component {
  constructor() {
    const navigationButtons = {
      getStartedScreenButton: new Button({
        innerHTML: 'Get Started',
        events: {
          click: () => {
            router.navigate('getStarted');
            drawer.close();
          },
        },
      }),
      componentsScreenButton: new Button({
        innerHTML: 'Components',
        events: {
          click: () => {
            router.navigate('components');
            drawer.close();
          },
        },
      }),
    };

    const drawer = new Drawer({
      body: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        },
        children: {
          ...navigationButtons,
        },
      },
    });

    const header = new Header({
      leftContent: {
        children: {
          logo: new Component({
            innerHTML: 'Pure Components',
            style: {
              cursor: 'pointer',
              fontSize: '1.25rem',
              base: {
                fontWeight: 'bold',
              },
              md: {
                fontSize: '1.25rem',
              },
            },
            events: {
              click: () => {
                router.navigate('getStarted');
              },
            },
          }),
        },
      },
      rightContent: {
        children: {
          btOpenDrawer: new Button({
            style: {
              padding: '0.375rem',
            },
            innerHTML:
              '<svg width="1.25rem" height="1.25rem" focusable="false" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>',
            events: {
              click: drawer.open,
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
        drawer,
      },
    });
  }
}

export default Layout;
