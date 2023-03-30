import { Tabs as PCTabs } from '../..';

class Tabs extends PCTabs {
  constructor(props: Partial<TabsConstructorProps>) {
    super({
      ...props,
      style: {
        ...props.style,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      tabList: {
        ...props.tabList,
        style: {
          ...props.tabList?.style,
          backgroundColor: 'transparent',
        },
      },
    });
  }
}

export default Tabs;
