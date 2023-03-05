import Component from '../component';
import type Tab from '../tab';
import './style.scss';

class Tabs extends Component {
  public activeTabIndex = 0;

  constructor(props: Partial<TabsConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `tabs${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<TabsConstructorProps>) => {
    return new Promise((resolve) => {
      const tabList = new Component({
        className: 'tabs__tab-list',
        ...payload.tabList,
      });
      const tabPanels = new Component({
        className: 'tabs__tab-panels',
        ...payload.tabPanels,
      });

      this.appendChildren({ tabList, tabPanels });

      resolve(true);
    });
  };

  private init = async (payload: Partial<TabsConstructorProps>) => {
    const { activeTabIndex, tabList } = payload;

    await this.assemble(payload);

    this.setActiveTabIndex(activeTabIndex || 0);

    if (tabList?.children) {
      Object.values(tabList.children).forEach((component, index) => {
        component.bindEvents({ click: () => this.setActiveTabIndex(index) });
      });
    }
  };

  public setActiveTabIndex = (activeTabIndex: TabsConstructorProps['activeTabIndex']) => {
    const { tabList, tabPanels } = this.children;

    const tabs = Object.values(tabList.children) as Tab[];
    const panels = Object.values(tabPanels.children);

    for (const tab of tabs) tab.setInactive();
    for (const panel of panels) panel.hide();

    tabs[activeTabIndex].setActive();
    panels[activeTabIndex].show();
  };
}

export default Tabs;
