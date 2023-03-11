import { Component } from '../..';
import Hero from '../components/hero';
import ButtonSection from '../sections/buttonSection';
import ComponentSection from '../sections/componentSection';
import TabsSection from '../sections/tabsSection';
import ToastSection from '../sections/toastSection';

class ComponentsScreen extends Component {
  constructor() {
    super({
      children: {
        hero: new Hero({
          title: 'Components',
          description:
            'Pure Components provide prebuild components to help you build your projects faster.<br>Here is a list with examples:',
        }),
        components: new Component({
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem',
          },
          children: {
            componentSection: new ComponentSection(),
            buttonSection: new ButtonSection(),
            tabsSection: new TabsSection(),
            toastSection: new ToastSection(),
          },
        }),
      },
    });
  }
}

export default ComponentsScreen;
