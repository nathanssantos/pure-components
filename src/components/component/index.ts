import Constants from '../../constants';
import Utils from '../../utils';

class Component {
  public children: { [name: string]: Component } = {};
  public id: string;
  public target: HTMLElement;

  constructor(props: Partial<ComponentConstructorProps> = {}) {
    const { attributes, children, className, events, innerHTML, style, tagName } = props;

    if (!(document.getElementById('pure-components__stylesheet') as HTMLStyleElement)?.sheet) {
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style type="text/css" id="${'pure-components__stylesheet'}"></style>`,
      );
    }

    const id = Utils.generateUUID();

    this.id = id;
    this.target = document.createElement(tagName || 'div');
    this.setAttributes({ 'data-testid': id });
    this.target.classList.add('pure-components', `component--${id}`);

    if (attributes) this.setAttributes(attributes);
    if (className?.length) this.target.classList.add(...className.split(' '));
    if (style) this.setStyle(style);
    if (typeof innerHTML === 'string') this.target.innerHTML = innerHTML;
    if (children) this.appendChildren(children);
    if (events) this.bindEvents(events);
  }

  public appendChildren = (payload: ComponentConstructorProps['children']) => {
    for (const [name, component] of Object.entries(payload)) {
      this.children[name] = component;
      this.target.append(component.target);
    }
  };

  public appendTo = (target: HTMLElement) => {
    target.append(this.target);
  };

  public bindEvents = async (payload: ComponentConstructorProps['events']) => {
    for (const [name, action] of Object.entries(payload)) {
      this.target.addEventListener(name, action);
    }
  };

  static create = (payload: Partial<ComponentConstructorProps> = {}) => {
    return new Component(payload);
  };

  public destroy = () => {
    this.target.parentNode?.removeChild(this.target);
  };

  public fadeIn = (to: ComponentConstructorProps['style'] = {}) => {
    return new Promise((resolve) => {
      this.show();
      setTimeout(() => {
        this.setStyle(to);
        resolve(true);
      }, 0);
    });
  };

  public fadeOut = (to: ComponentConstructorProps['style'] = {}) => {
    return new Promise((resolve) => {
      this.setStyle(to);
      setTimeout(() => {
        this.hide();
        resolve(true);
      }, Number(getComputedStyle(this.target).transitionDuration.replace('s', '')) * 1000);
    });
  };

  public hide = () => {
    this.setStyle({ display: 'none' });
  };

  public prependChildren = (payload: ComponentConstructorProps['children']) => {
    for (const [name, component] of Object.entries(payload)) {
      this.children[name] = component;
      this.target.prepend(component.target);
    }
  };

  public prependTo = (target: HTMLElement) => {
    target.prepend(this.target);
  };

  public setAttributes = (payload: ComponentConstructorProps['attributes']) => {
    for (const [key, value] of Object.entries(payload)) {
      this.target.setAttribute(key, value.toString());
    }
  };

  public setStyle = (payload: ComponentConstructorProps['style']) => {
    const { base, sm, md, lg, xl, ...rest } = payload as ResponsiveObject<
      Partial<CSSStyleDeclaration>
    >;

    const styleSheet = (
      document.getElementById('pure-components__stylesheet') as HTMLStyleElement
    ).sheet!;

    if (Object.entries(rest).length) {
      let cssText = `.component--${this.id} { `;

      const ruleIndex = Array.from(styleSheet.cssRules).findIndex(
        (rule) => (rule as CSSStyleRule).selectorText === `.component--${this.id}`,
      );

      if (ruleIndex !== -1 && styleSheet.cssRules.item) {
        cssText = (styleSheet.cssRules.item(ruleIndex) as CSSRule).cssText.replace(' }', '');
        styleSheet.deleteRule(ruleIndex);
      }

      for (const [key, value] of Object.entries(rest)) {
        cssText += ` ${Utils.camelCaseToKebabCase(key)}: ${value};`;
      }

      styleSheet.insertRule(`${cssText} }`);
    }

    const responsiveObject = Object.entries({ xl, lg, md, sm, base }).filter(
      ([breakpoint, cssDeclaration]) => breakpoint && cssDeclaration,
    );

    for (const [breakpoint, cssDeclaration] of responsiveObject) {
      for (const [key, value] of Object.entries(cssDeclaration)) {
        const cssText = `@media screen and (min-width: ${
          Constants.breakpoints[breakpoint]
        }) { .component--${this.id} { ${Utils.camelCaseToKebabCase(key)}: ${value}; } }`;

        if (
          !Array.from(styleSheet.cssRules).some(
            (rule) => (rule as CSSStyleRule).cssText === cssText,
          )
        ) {
          styleSheet.insertRule(cssText);
        }
      }
    }
  };

  public show = () => {
    this.setStyle({ display: 'flex' });
  };
}

export default Component;
