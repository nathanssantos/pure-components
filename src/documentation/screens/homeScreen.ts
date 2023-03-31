import { Component } from '../..';
import Hero from '../components/hero';
import AvatarSection from '../sections/avatarSection';
import ButtonSection from '../sections/buttonSection';
import ComponentSection from '../sections/componentSection';
import ContainerSection from '../sections/containerSection';
import DrawerSection from '../sections/drawerSection';
import HeaderSection from '../sections/headerSection';
import InstallSection from '../sections/installSection';
import ModalSection from '../sections/modalSection';
import TabsSection from '../sections/tabsSection';
import ToastSection from '../sections/toastSection';

class HomeScreen extends Component {
  constructor() {
    super({
      style: {
        paddingBottom: '6rem',
      },
      children: {
        heroGetStarted: new Hero({ title: 'Get Started' }),
        installSection: new InstallSection(),
        heroComponents: new Hero({
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
            avatarSection: new AvatarSection(),
            buttonSection: new ButtonSection(),
            componentSection: new ComponentSection(),
            containerSection: new ContainerSection(),
            drawerSection: new DrawerSection(),
            headerSection: new HeaderSection(),
            modalSection: new ModalSection(),
            tabsSection: new TabsSection(),
            toastSection: new ToastSection(),
          },
        }),
      },
    });
  }
}

export default HomeScreen;
