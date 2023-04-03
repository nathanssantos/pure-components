import Button from '../button';
import Component from '../component';
import './style.scss';

class Tab extends Button {
  public isActive = false;

  constructor(props: Partial<TabConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `tab${className?.length ? ` ${className}` : ''}`, ...rest });

    this.assemble(props);
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

  public setActive = (isActive: boolean) => {
    this.isActive = isActive;
    this.children.activityIndicator.setStyle({ width: isActive ? '100%' : '0' });
  };
}

export default Tab;
