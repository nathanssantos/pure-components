import { Component } from '../..';
import Hero from '../components/hero';
import AccordionSection from '../sections/accordionSection';
import AvatarSection from '../sections/avatarSection';
import BreadcrumbsSection from '../sections/breadcrumbsSection';
import ButtonSection from '../sections/buttonSection';
import CheckboxSection from '../sections/checkboxSection';
import ComponentSection from '../sections/componentSection';
import ContainerSection from '../sections/containerSection';
import DrawerSection from '../sections/drawerSection';
import HeaderSection from '../sections/headerSection';
import InputSection from '../sections/inputSection';
import InstallSection from '../sections/installSection';
import ModalSection from '../sections/modalSection';
import ProgressSection from '../sections/progressSection';
import RadioSection from '../sections/radioSection';
import SelectSection from '../sections/selectSection';
import TabsSection from '../sections/tabsSection';
import TagSection from '../sections/tagSection';
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
            accordionSection: new AccordionSection(),
            avatarSection: new AvatarSection(),
            breadcrumbsSection: new BreadcrumbsSection(),
            buttonSection: new ButtonSection(),
            checkboxSection: new CheckboxSection(),
            componentSection: new ComponentSection(),
            containerSection: new ContainerSection(),
            drawerSection: new DrawerSection(),
            headerSection: new HeaderSection(),
            inputSection: new InputSection(),
            modalSection: new ModalSection(),
            progressSection: new ProgressSection(),
            radioSection: new RadioSection(),
            selectSection: new SelectSection(),
            tabsSection: new TabsSection(),
            tagSection: new TagSection(),
            toastSection: new ToastSection(),
          },
        }),
      },
    });
  }
}

export default HomeScreen;
