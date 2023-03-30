import { TabPanel as PCTabPanel } from '../..';

class TabPanel extends PCTabPanel {
  constructor(props: Partial<TabConstructorProps>) {
    super({
      ...props,
      style: {
        ...props.style,
        paddingLeft: '0',
        paddingRight: '0',
      },
    });
  }
}

export default TabPanel;
