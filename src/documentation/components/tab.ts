import { Tab as PCTab } from '../..';

class Tab extends PCTab {
  constructor(props: Partial<TabConstructorProps>) {
    super({
      ...props,
      style: {
        ...props.style,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    });
  }
}

export default Tab;
