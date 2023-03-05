import Component from '../component';

class Tabs extends Component {
  readonly initialRoute = 'components';

  constructor(props: Partial<TabsConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `tabs${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<TabsConstructorProps>) => {
    return new Promise((resolve) => {
      const tabList = new Component({
        className: 'drawer__tab-list',
        ...payload.tabList,
      });
      const tabPanels = new Component({
        className: 'drawer__tab-panels',
        ...payload.tabPanels,
      });

      this.appendChildren({ tabList, tabPanels });

      resolve(true);
    });
  };

  private init = async (payload: Partial<TabsConstructorProps>) => {
    await this.assemble(payload);

    const { content, overlay } = this.children;

    for (const component of [content.children.header.children.btClose, overlay]) {
      component.bindEvents({ click: () => '' });
    }
  };
}

export default Tabs;
