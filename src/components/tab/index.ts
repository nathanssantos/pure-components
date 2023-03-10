import Component from '../component';
import Button from '../button';
import './style.scss';

class Tab extends Button {
  public isActive = false;

  constructor(props: Partial<TabConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `tab${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<TabConstructorProps>) => {
    return new Promise((resolve) => {
      const activityIndicator = new Component({
        className: 'tab__activity-indicator',
        ...payload.activityIndicator,
      });

      this.appendChildren({ activityIndicator });

      resolve(true);
    });
  };

  private init = async (payload: Partial<TabConstructorProps>) => {
    await this.assemble(payload);
  };

  public setActive = (isActive: boolean) => {
    this.isActive = isActive;
    this.children.activityIndicator.setStyle({ width: isActive ? '100%' : '0' });
  };
}

export default Tab;
