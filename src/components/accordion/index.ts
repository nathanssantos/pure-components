import Button from '../button';
import Component from '../component';
import './style.scss';

class Accordion extends Component {
  isOpen = false;

  constructor(props: Partial<AccordionConstructorProps> = {}) {
    const { className, ...rest } = props;

    super({ className: `accordion${className?.length ? ` ${className}` : ''}`, ...rest });

    this.init(props);
  }

  private assemble = (payload: Partial<AccordionConstructorProps>) => {
    return new Promise((resolve) => {
      const icon = new Component({
        className: 'accordion__icon',
        innerHTML:
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>',
        ...payload.icon,
      });
      const header = new Button({
        className: 'accordion__header',
        children: { icon },
        ...payload.header,
      });
      const content = new Component({
        className: 'accordion__content',
        ...payload.content,
      });
      const dropdown = new Component({
        className: 'accordion__dropdown',
        children: { content },
        ...payload.dropdown,
      });

      this.appendChildren({ header, dropdown });

      resolve(true);
    });
  };

  public close = async () => {
    const { header, dropdown } = this.children;

    header.children.icon.setStyle({ transform: 'initial' });
    dropdown.setStyle({
      minHeight: '0',
    });

    this.isOpen = false;
  };

  private init = async (payload: Partial<AccordionConstructorProps>) => {
    await this.assemble(payload);

    this.children.header.bindEvents({
      click: (_, event) => {
        event.stopPropagation();
        this.toggle();
      },
    });

    if (payload.isOpen) this.open();
  };

  public toggle = async () => {
    this.isOpen ? this.close() : this.open();
  };

  public open = async () => {
    const { header, dropdown } = this.children;

    header.children.icon.setStyle({ transform: 'rotate(-180deg)' });
    dropdown.setStyle({
      minHeight: `${dropdown.children.content.target.offsetHeight}px`,
    });

    this.isOpen = true;
  };
}

export default Accordion;
