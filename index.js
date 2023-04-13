import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';

true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
            fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
            fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (link.crossOrigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const style$j = '';

class Constants {
  static breakpoints = {
    base: "0em",
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em"
  };
}

class Utils {
  static camelCaseToKebabCase = (string) => {
    return string.replace(/[A-Z]/g, (character) => "-" + character.toLowerCase());
  };
  static generateUUID = () => {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : r & 3 | 8).toString(16);
    });
    return uuid;
  };
}

class Component {
  children = {};
  id;
  state = {};
  target;
  constructor(props = {}) {
    const { attributes, children, className, events, innerHTML, state, style, tagName } = props;
    if (!document.getElementById("pure-components__stylesheet")?.sheet) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `<style type="text/css" id="${"pure-components__stylesheet"}"></style>`
      );
    }
    const id = Utils.generateUUID();
    this.id = id;
    this.target = document.createElement(tagName || "div");
    this.setAttributes({ "data-testid": id });
    this.target.classList.add("pure-components", `component--${id}`);
    if (state)
      this.setState(state);
    if (attributes)
      this.setAttributes(attributes);
    if (className?.length)
      this.target.classList.add(...className.split(" "));
    if (style)
      this.setStyle(style);
    if (typeof innerHTML === "string")
      this.target.innerHTML = innerHTML;
    if (children)
      this.appendChildren(children);
    if (events)
      this.bindEvents(events);
  }
  appendChildren = (payload) => {
    for (const [name, component] of Object.entries(payload)) {
      if (component instanceof Component) {
        this.children[name] = component;
        this.target.append(component.target);
      } else {
        const newChild = new Component({ innerHTML: component });
        this.children[name] = newChild;
        this.target.append(newChild.target);
      }
    }
  };
  appendTo = (target) => {
    target.append(this.target);
  };
  bindEvents = async (payload) => {
    for (const [name, action] of Object.entries(payload)) {
      this.target.addEventListener(name, (event) => action(this, event));
    }
  };
  static create = (payload = {}) => {
    return new Component(payload);
  };
  destroy = () => {
    this.target.parentNode?.removeChild(this.target);
  };
  fadeIn = (to = {}) => {
    return new Promise((resolve) => {
      this.show();
      setTimeout(() => {
        this.setStyle(to);
        resolve(true);
      }, 0);
    });
  };
  fadeOut = (to = {}) => {
    return new Promise((resolve) => {
      this.setStyle(to);
      setTimeout(() => {
        this.hide();
        resolve(true);
      }, Number(getComputedStyle(this.target).transitionDuration.replace("s", "")) * 1e3);
    });
  };
  hide = () => {
    this.setStyle({ display: "none" });
  };
  prependChildren = (payload) => {
    for (const [name, component] of Object.entries(payload)) {
      if (component instanceof Component) {
        this.children[name] = component;
        this.target.prepend(component.target);
      } else {
        const newChild = new Component({ innerHTML: component });
        this.children[name] = newChild;
        this.target.prepend(newChild.target);
      }
    }
  };
  prependTo = (target) => {
    target.prepend(this.target);
  };
  setAttributes = (payload) => {
    for (const [key, value] of Object.entries(payload)) {
      this.target.setAttribute(key, value.toString());
    }
  };
  setState = (payload) => {
    for (const [key, value] of Object.entries(payload))
      this.state[key] = value;
  };
  setStyle = (payload) => {
    const { base, sm, md, lg, xl, ...rest } = payload;
    const styleSheet = document.getElementById("pure-components__stylesheet").sheet;
    const componentSelector = `.component--${this.id}`;
    if (Object.entries(rest).length) {
      let cssText = `${componentSelector} { `;
      const ruleIndex = Array.from(styleSheet.cssRules).findIndex(
        (rule) => rule.selectorText === componentSelector
      );
      if (ruleIndex !== -1 && styleSheet.cssRules.item) {
        cssText = styleSheet.cssRules.item(ruleIndex).cssText.replace(" }", "");
        styleSheet.deleteRule(ruleIndex);
      }
      for (const [key, value] of Object.entries(rest)) {
        cssText += ` ${Utils.camelCaseToKebabCase(key)}: ${value};`;
      }
      styleSheet.insertRule(`${cssText} }`);
    }
    const responsiveObject = Object.entries({ xl, lg, md, sm, base }).filter(
      ([breakpoint, cssDeclaration]) => breakpoint && cssDeclaration
    );
    for (const [breakpoint, cssDeclaration] of responsiveObject) {
      for (const [key, value] of Object.entries(cssDeclaration)) {
        const cssText = `@media screen and (min-width: ${Constants.breakpoints[breakpoint]}) { ${componentSelector} { ${Utils.camelCaseToKebabCase(key)}: ${value}; } }`;
        if (!Array.from(styleSheet.cssRules).some(
          (rule) => rule.cssText === cssText
        )) {
          styleSheet.insertRule(cssText);
        }
      }
    }
  };
  show = () => {
    this.setStyle({ display: "flex" });
  };
}

const style$i = '';

class Button extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `button${className?.length ? ` ${className}` : ""}`,
      tagName: "button",
      ...rest
    });
  }
}

const style$h = '';

class Accordion extends Component {
  isOpen = false;
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `accordion${className?.length ? ` ${className}` : ""}`, ...rest });
    this.init(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const icon = new Component({
        className: "accordion__icon",
        innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>',
        ...payload.icon
      });
      const header = new Button({
        className: "accordion__header",
        children: { icon },
        ...payload.header
      });
      const content = new Component({
        className: "accordion__content",
        ...payload.content
      });
      const dropdown = new Component({
        className: "accordion__dropdown",
        children: { content },
        ...payload.dropdown
      });
      this.appendChildren({ header, dropdown });
      resolve(true);
    });
  };
  close = async () => {
    const { header, dropdown } = this.children;
    header.children.icon.setStyle({ transform: "initial" });
    dropdown.setStyle({
      minHeight: "0"
    });
    this.isOpen = false;
  };
  init = async (payload) => {
    await this.assemble(payload);
    this.children.header.bindEvents({
      click: (_, event) => {
        event.stopPropagation();
        this.toggle();
      }
    });
    if (payload.isOpen)
      this.open();
  };
  toggle = async () => {
    this.isOpen ? this.close() : this.open();
  };
  open = async () => {
    const { header, dropdown } = this.children;
    header.children.icon.setStyle({ transform: "rotate(-180deg)" });
    dropdown.setStyle({
      minHeight: `${dropdown.children.content.target.offsetHeight}px`
    });
    this.isOpen = true;
  };
}

const style$g = '';

class Avatar extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `avatar${className?.length ? ` ${className}` : ""}`, ...rest });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const image = new Component({
        className: "avatar__image",
        tagName: "img",
        ...payload.image
      });
      const imageWrapper = new Component({
        children: { image },
        className: "avatar__image-wrapper",
        ...payload.imageWrapper
      });
      const name = new Component({
        className: "avatar__name",
        ...payload.name
      });
      const description = new Component({
        className: "avatar__description",
        ...payload.description
      });
      const textWrapper = new Component({
        children: { name, description },
        className: "avatar__text-wrapper",
        ...payload.textWrapper
      });
      this.appendChildren({ imageWrapper, textWrapper });
      resolve(true);
    });
  };
}

const style$f = '';

class Breadcrumbs extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `breadcrumbs${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$e = '';

class Checkbox extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `checkbox${className?.length ? ` ${className}` : ""}`, ...rest });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const icon = new Component({
        className: "checkbox__icon",
        innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="12" height="12" stroke-width="4" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>',
        ...payload.icon
      });
      const field = new Component({
        className: "checkbox__field",
        tagName: "input",
        ...payload.field,
        attributes: {
          type: "checkbox",
          ...payload.field?.attributes
        }
      });
      const border = new Component({
        className: "checkbox__border",
        ...payload.border,
        children: {
          icon,
          ...payload.border?.children
        }
      });
      const label = new Component({
        className: "checkbox__label",
        tagName: "label",
        ...payload.label
      });
      label.prependChildren({ border, field });
      this.appendChildren({ label });
      resolve(true);
    });
  };
}

const style$d = '';

class Container extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `container${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$c = '';

class Drawer extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `drawer${className?.length ? ` ${className}` : ""}`, ...rest });
    this.init(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const btClose = new Button({
        className: "drawer__bt-close",
        innerHTML: "x",
        ...payload.btClose
      });
      const header = new Component({
        children: { btClose },
        className: "drawer__header",
        ...payload.header
      });
      const body = new Component({
        className: "drawer__body",
        ...payload.body
      });
      const footer = new Component({
        className: "drawer__footer",
        ...payload.footer
      });
      const content = new Component({
        children: { header, body, footer },
        className: "drawer__content",
        ...payload.content
      });
      const overlay = new Component({
        className: "drawer__overlay",
        ...payload.overlay
      });
      this.appendChildren({ overlay, content });
      resolve(true);
    });
  };
  close = async () => {
    const { content, overlay } = this.children;
    await Promise.allSettled([
      content.fadeOut({ transform: "translateX(-100%)" }),
      overlay.fadeOut({ opacity: "0" })
    ]);
    this.hide();
  };
  init = async (payload) => {
    await this.assemble(payload);
    const { content, overlay } = this.children;
    for (const component of [content.children.header.children.btClose, overlay]) {
      component.bindEvents({ click: this.close });
    }
  };
  open = async () => {
    this.show();
    const { content, overlay } = this.children;
    await Promise.allSettled([
      content.fadeIn({ transform: "translateX(0)" }),
      overlay.fadeIn({ opacity: "1" })
    ]);
  };
}

const style$b = '';

class Header extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `header${className?.length ? ` ${className}` : ""}`,
      tagName: "header",
      ...rest
    });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const container = new Container({
        className: "header__container",
        ...payload.container
      });
      if (payload.leftContent) {
        container.appendChildren({
          leftContent: new Component({
            className: "header__left-content",
            ...payload.leftContent
          })
        });
      }
      if (payload.centerContent) {
        container.appendChildren({
          centerContent: new Component({
            className: "header__center-content",
            ...payload.centerContent
          })
        });
      }
      if (payload.rightContent) {
        container.appendChildren({
          rightContent: new Component({
            className: "header__right-content",
            ...payload.rightContent
          })
        });
      }
      this.appendChildren({ container });
      resolve(true);
    });
  };
}

const style$a = '';

class Input extends Component {
  activeTabIndex = 0;
  constructor(props = {}) {
    const { className, leftSlot, rightSlot, ...rest } = props;
    const getClassName = () => {
      let newClassName = "input";
      if (className)
        newClassName += ` ${className}`;
      if (leftSlot)
        newClassName += " input--has-left-slot";
      if (rightSlot)
        newClassName += " input--has-right-slot";
      return newClassName;
    };
    super({ className: getClassName(), ...rest });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const field = new Component({
        tagName: "input",
        className: "input__field",
        ...payload.field,
        attributes: {
          type: "text",
          size: "1",
          ...payload.field?.attributes
        }
      });
      const fieldWrapper = new Component({
        className: "input__field-wrapper",
        ...payload.fieldWrapper,
        children: {
          field,
          ...payload.fieldWrapper?.children
        }
      });
      if (payload.leftSlot) {
        const leftSlot = new Component({
          className: "input__slot input__slot--left",
          ...payload.leftSlot
        });
        fieldWrapper.prependChildren({ leftSlot });
      }
      if (payload.rightSlot) {
        const rightSlot = new Component({
          className: "input__slot input__slot--right",
          ...payload.rightSlot
        });
        fieldWrapper.appendChildren({ rightSlot });
      }
      if (payload.label) {
        const label = new Component({
          className: "input__label",
          ...payload.label
        });
        this.appendChildren({ label });
      }
      this.appendChildren({ fieldWrapper });
      resolve(true);
    });
  };
}

const style$9 = '';

class Modal extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `modal${className?.length ? ` ${className}` : ""}`, ...rest });
    this.init(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const btClose = new Button({
        className: "modal__bt-close",
        innerHTML: "x",
        ...payload.btClose
      });
      const header = new Component({
        children: { btClose },
        className: "modal__header",
        ...payload.header
      });
      const body = new Component({
        className: "modal__body",
        ...payload.body
      });
      const footer = new Component({
        className: "modal__footer",
        ...payload.footer
      });
      const content = new Component({
        children: { header, body, footer },
        className: "modal__content",
        ...payload.content
      });
      const overlay = new Component({
        className: "modal__overlay",
        ...payload.overlay
      });
      this.appendChildren({ overlay, content });
      resolve(true);
    });
  };
  close = async () => {
    const { content, overlay } = this.children;
    await Promise.allSettled([
      content.fadeOut({ opacity: "0" }),
      overlay.fadeOut({ opacity: "0" })
    ]);
    this.hide();
  };
  init = async (payload) => {
    await this.assemble(payload);
    const { content, overlay } = this.children;
    for (const component of [content.children.header.children.btClose, overlay]) {
      component.bindEvents({ click: this.close });
    }
  };
  open = async () => {
    this.show();
    const { content, overlay } = this.children;
    await Promise.allSettled([
      content.fadeIn({ opacity: "1" }),
      overlay.fadeIn({ opacity: "1" })
    ]);
  };
}

const style$8 = '';

class Progress extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `progress${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
    this.init(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const fill = new Component({
        className: "progress__fill",
        ...payload.fill
      });
      const value = new Component({
        className: "progress__value",
        ...payload.value
      });
      this.appendChildren({ fill, value });
      resolve(true);
    });
  };
  init = (payload) => {
    this.assemble(payload);
    this.setValue(0);
  };
  setValue = (value) => {
    this.children.fill.setStyle({ width: `${value}%` });
    this.children.value.target.innerHTML = `${value}%`;
  };
}

const style$7 = '';

class Radio extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `radio${className?.length ? ` ${className}` : ""}`, ...rest });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const icon = new Component({
        className: "radio__icon",
        ...payload.icon
      });
      const field = new Component({
        className: "radio__field",
        tagName: "input",
        ...payload.field,
        attributes: {
          type: "radio",
          ...payload.field?.attributes
        }
      });
      const border = new Component({
        className: "radio__border",
        ...payload.border,
        children: {
          icon,
          ...payload.border?.children
        }
      });
      const label = new Component({
        className: "radio__label",
        tagName: "label",
        ...payload.label
      });
      label.prependChildren({ border, field });
      this.appendChildren({ label });
      resolve(true);
    });
  };
}

const style$6 = '';

class Select extends Component {
  activeTabIndex = 0;
  constructor(props = {}) {
    const { className, leftSlot, rightSlot, ...rest } = props;
    const getClassName = () => {
      let newClassName = "select select--has-right-slot";
      if (className)
        newClassName += ` ${className}`;
      if (leftSlot)
        newClassName += " select--has-left-slot";
      return newClassName;
    };
    super({ className: getClassName(), ...rest });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const field = new Component({
        tagName: "select",
        className: "select__field",
        ...payload.field,
        attributes: {
          size: "1",
          ...payload.field?.attributes
        }
      });
      const chevronDownIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>';
      const rightSlot = new Component({
        className: "select__slot select__slot--right",
        innerHTML: chevronDownIcon,
        ...payload.rightSlot
      });
      const fieldWrapper = new Component({
        className: "select__field-wrapper",
        ...payload.fieldWrapper,
        children: {
          field,
          rightSlot,
          ...payload.fieldWrapper?.children
        }
      });
      if (payload.leftSlot) {
        const leftSlot = new Component({
          className: "select__slot select__slot--left",
          ...payload.leftSlot
        });
        fieldWrapper.prependChildren({ leftSlot });
      }
      if (payload.label) {
        const label = new Component({
          className: "select__label",
          ...payload.label
        });
        this.appendChildren({ label });
      }
      this.appendChildren({ fieldWrapper });
      resolve(true);
    });
  };
}

const style$5 = '';

class Tab extends Button {
  isActive = false;
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `tab${className?.length ? ` ${className}` : ""}`, ...rest });
    this.assemble(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const activityIndicator = new Component({
        className: "tab__activity-indicator",
        ...payload.activityIndicator
      });
      this.appendChildren({ activityIndicator });
      resolve(true);
    });
  };
  setActive = (isActive) => {
    this.isActive = isActive;
    this.children.activityIndicator.setStyle({ width: isActive ? "100%" : "0" });
  };
}

const style$4 = '';

class TabPanel extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `tab-panel${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$3 = '';

class Tabs extends Component {
  activeTabIndex = 0;
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `tabs${className?.length ? ` ${className}` : ""}`, ...rest });
    this.init(props);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const tabList = new Component({
        className: "tabs__tab-list",
        ...payload.tabList
      });
      const tabPanels = new Component({
        className: "tabs__tab-panels",
        ...payload.tabPanels
      });
      this.appendChildren({ tabList, tabPanels });
      resolve(true);
    });
  };
  init = async (payload) => {
    const { activeTabIndex, tabList } = payload;
    await this.assemble(payload);
    this.setActiveTabIndex(activeTabIndex || 0);
    if (tabList?.children) {
      Object.values(tabList.children).forEach((component, index) => {
        component.bindEvents({ click: () => this.setActiveTabIndex(index) });
      });
    }
  };
  setActiveTabIndex = (activeTabIndex) => {
    const { tabList, tabPanels } = this.children;
    const tabs = Object.values(tabList.children);
    const panels = Object.values(tabPanels.children);
    for (const tab of tabs)
      tab.setActive(false);
    for (const panel of panels)
      panel.hide();
    const currentTab = tabs[activeTabIndex];
    const currentPanel = panels[activeTabIndex];
    if (currentTab)
      currentTab.setActive(true);
    if (currentPanel)
      currentPanel.show();
  };
}

const style$2 = '';

class Tag extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `tag${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$1 = '';

class Toast extends Component {
  constructor(props = {}) {
    const { className, position = "bottom-right", variant = "default", ...rest } = props;
    const getClassName = () => {
      let newClassName = "toast";
      newClassName += ` toast--${position}`;
      newClassName += ` toast--${variant}`;
      if (className)
        newClassName += ` ${className}`;
      return newClassName;
    };
    super({
      className: getClassName(),
      ...rest
    });
    this.assemble(rest);
  }
  assemble = (payload) => {
    return new Promise((resolve) => {
      const title = new Component({
        className: "toast__title",
        tagName: "span",
        ...payload.title
      });
      const closeButton = new Button({
        className: "toast__bt-close",
        innerHTML: "x",
        events: {
          click: this.dismiss
        }
      });
      const header = new Component({
        className: "toast__header",
        children: { title, closeButton }
      });
      const description = new Component({
        className: "toast__description",
        ...payload.description
      });
      this.appendChildren({ header, description });
      resolve(true);
    });
  };
  dismiss = () => {
    return new Promise((resolve) => {
      this.target.classList.remove("toast--open");
      setTimeout(() => {
        this.target.remove();
        resolve(true);
      }, 500);
    });
  };
  show = () => {
    return new Promise((resolve) => {
      const toasts = document.querySelectorAll(".toast");
      if (toasts.length)
        for (const toast of toasts)
          toast.remove();
      this.appendTo(document.querySelector("body"));
      setTimeout(() => {
        this.target.classList.add("toast--open");
      }, 0);
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  };
  static async trigger(payload) {
    const { duration = 3e3 } = payload;
    const toast = new Toast(payload);
    await toast.show();
    return await new Promise((resolve) => {
      setTimeout(async () => {
        await toast.dismiss();
        resolve(true);
      }, duration);
    });
  }
}

const name = "@nathanssantos/pure-components";
const version = "0.0.45";
const author = {
	name: "Nathan Silva Santos",
	email: "nathansilvasantos@gmail.com"
};
const license = "MIT";
const publishConfig = {
	access: "public"
};
const type = "module";
const main = "./dist/index.js";
const module = "./dist/index.js";
const types = "./src/types/global.d.ts";
const exports = {
	".": "./dist/index.js",
	"./style.css": "./dist/style.css",
	"./package.json": "./package.json"
};
const files = [
	"dist",
	"index.d.ts"
];
const scripts = {
	dev: "vite",
	build: "tsc && vite build --base=./",
	preview: "vite preview",
	test: "jest",
	predeploy: "yarn build",
	deploy: "gh-pages -d dist",
	check: "tsc --noEmit",
	prepublishOnly: "npm run test && npm run check && npm run build"
};
const devDependencies = {
	"@types/jest": "^29.4.0",
	"@typescript-eslint/eslint-plugin": "^5.51.0",
	"@typescript-eslint/parser": "^5.51.0",
	eslint: "^8.34.0",
	"eslint-config-prettier": "^8.6.0",
	"eslint-plugin-import": "^2.27.5",
	"eslint-plugin-jest": "^27.2.1",
	"eslint-plugin-prettier": "^4.2.1",
	"gh-pages": "^5.0.0",
	husky: "^8.0.3",
	"identity-obj-proxy": "^3.0.0",
	jest: "^29.4.2",
	"jest-environment-jsdom": "^29.4.2",
	"lint-staged": "^13.1.1",
	prettier: "^2.8.4",
	sass: "^1.58.0",
	"ts-jest": "^29.0.5",
	"ts-node": "^10.9.1",
	typescript: "^4.9.3",
	vite: "^4.1.0"
};
const repository = {
	type: "git",
	url: "git+https://github.com/nathanssantos/pure-components.git"
};
const bugs = {
	url: "https://github.com/nathanssantos/pure-components/issues"
};
const homepage = "https://nathanssantos.github.io/pure-components";
const keywords = [
	"customizable",
	"dependency-free",
	"dependency free",
	"components",
	"ui library",
	"javascript",
	"js",
	"typescript",
	"ts",
	"responsive",
	"component",
	"drawer",
	"modal",
	"avatar",
	"button",
	"container",
	"header",
	"tabs",
	"tag",
	"breadcrumbs",
	"progress",
	"checkbox",
	"radio",
	"org chart",
	"toast",
	"tooltip",
	"popover",
	"carousel"
];
const packageJSON = {
	name: name,
	version: version,
	author: author,
	license: license,
	publishConfig: publishConfig,
	type: type,
	main: main,
	module: module,
	types: types,
	exports: exports,
	files: files,
	scripts: scripts,
	devDependencies: devDependencies,
	repository: repository,
	bugs: bugs,
	homepage: homepage,
	keywords: keywords
};

const header = new Header({
  style: {
    zIndex: "20"
  },
  leftContent: {
    innerHTML: "Pure Components",
    style: {
      fontWeight: "bold",
      base: {
        fontSize: "var(--pc-font-size-md)"
      },
      md: {
        fontSize: "var(--pc-font-size-lg)"
      }
    }
  },
  rightContent: {
    innerHTML: `v${packageJSON.version}`,
    style: {
      base: {
        fontSize: "var(--pc-font-size-xs)"
      },
      md: {
        fontSize: "var(--pc-font-size-sm)"
      }
    }
  }
});
class Layout extends Component {
  constructor() {
    super({
      className: "layout",
      children: {
        header,
        screens: new Component()
      }
    });
  }
}

class SectionDescription extends Component {
  constructor(props) {
    super({
      style: {
        marginBottom: "1rem",
        base: {
          fontSize: "var(--pc-font-size-sm)"
        },
        md: {
          fontSize: "var(--pc-font-size-md)"
        }
      },
      ...props
    });
  }
}

class Hero extends Component {
  constructor(props) {
    super({
      children: {
        container: new Container({
          style: {
            gap: "1rem",
            paddingTop: "8rem"
          },
          children: {
            title: new Component({
              innerHTML: props.title,
              style: {
                fontWeight: "bold",
                base: {
                  fontSize: "1.85rem"
                },
                md: {
                  fontSize: "2.5rem"
                }
              }
            }),
            description: new SectionDescription({
              innerHTML: props.description
            })
          }
        })
      }
    });
  }
}

class CodeExample extends Component {
  constructor(props = {}) {
    super({
      tagName: "pre",
      ...props,
      style: {
        borderRadius: "0.25rem",
        overflow: "hidden",
        base: {
          fontSize: "var(--pc-font-size-sm)"
        },
        md: {
          fontSize: "var(--pc-font-size-md)"
        },
        ...props.style
      },
      children: {
        code: new Component({
          tagName: "code",
          innerHTML: props.content,
          className: props.language ? `language-${props.language}` : ""
        })
      }
    });
  }
}

class SectionTitle extends Component {
  constructor(props) {
    super({
      style: {
        marginBottom: "1rem",
        fontWeight: "bold",
        base: {
          fontSize: "1.5rem"
        },
        md: {
          fontSize: "1.75rem"
        }
      },
      ...props
    });
  }
}

const componentExample$g = new Component({
  style: {
    maxWidth: "20rem"
  },
  children: {
    accordion: new Accordion({
      header: {
        innerHTML: "Accordion Header"
      },
      content: {
        style: {
          padding: "0.5rem"
        },
        innerHTML: "Accordion Content"
      }
    }),
    accordion_1: new Accordion({
      header: {
        innerHTML: "Accordion Item 1"
      },
      content: {
        style: {
          padding: "0.5rem"
        },
        innerHTML: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?"
      }
    }),
    accordion_2: new Accordion({
      header: {
        innerHTML: "Accordion Item 2"
      },
      content: {
        style: {
          padding: "0.5rem"
        },
        innerHTML: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?"
      }
    }),
    accordion_3: new Accordion({
      isOpen: true,
      header: {
        innerHTML: "Accordion Item 3"
      },
      content: {
        style: {
          padding: "0.5rem"
        },
        innerHTML: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?"
      }
    }),
    accordion_4: new Accordion({
      header: {
        innerHTML: "Accordion Item 4"
      },
      content: {
        style: {
          padding: "0.5rem"
        },
        innerHTML: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?"
      }
    }),
    accordion_5: new Accordion({
      header: {
        innerHTML: "Accordion Item 5"
      },
      content: {
        style: {
          padding: "0.5rem"
        },
        innerHTML: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?"
      }
    })
  }
});
const codeExample$g = new CodeExample({
  language: "typescript",
  content: `import { Accordion, Component } from '@nathanssantos/pure-components';

new Component({
  style: {
    maxWidth: '20rem',
  },
  children: {
    accordion: new Accordion({
      header: {
        innerHTML: 'Accordion Header',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML: 'Accordion Content',
      },
    }),
    accordion_1: new Accordion({
      header: {
        innerHTML: 'Accordion Item 1',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_2: new Accordion({
      header: {
        innerHTML: 'Accordion Item 2',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_3: new Accordion({
      isOpen: true,
      header: {
        innerHTML: 'Accordion Item 3',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_4: new Accordion({
      header: {
        innerHTML: 'Accordion Item 4',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
    accordion_5: new Accordion({
      header: {
        innerHTML: 'Accordion Item 5',
      },
      content: {
        style: {
          padding: '0.5rem',
        },
        innerHTML:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum?',
      },
    }),
  },
}).appendTo(document.body);`
});
class AccordionSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "accordion"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Accordion" }),
            description: new SectionDescription({
              innerHTML: "A simple accordion component."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$g,
                      codeExample: codeExample$g
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$f = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    avatar: new Avatar({
      image: {
        attributes: {
          src: "https://i.pravatar.cc/300"
        }
      },
      name: {
        innerHTML: "John Doe"
      },
      description: {
        innerHTML: "john@doe.com"
      }
    })
  }
});
const codeExample$f = new CodeExample({
  language: "typescript",
  content: `import { Avatar } from '@nathanssantos/pure-components';

new Avatar({
  image: {
    attributes: {
      src: 'https://i.pravatar.cc/300',
    },
  },
  name: {
    innerHTML: 'John Doe',
  },
  description: {
    innerHTML: 'john@doe.com',
  },
}).appendTo(document.body);`
});
class AvatarSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "avatar"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Avatar" }),
            description: new SectionDescription({
              innerHTML: "A simple avatar wich contains image, name and description."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$f,
                      codeExample: codeExample$f
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$e = new Breadcrumbs({
  children: {
    item1: new Component({
      innerHTML: "Home",
      style: {
        fontWeight: "700"
      }
    }),
    item2: "Route A",
    item3: "Route B"
  }
});
const codeExample$e = new CodeExample({
  language: "typescript",
  content: `import { Breadcrumbs } from '@nathanssantos/pure-components';

new Breadcrumbs({
  children: {
    item1: new Component({
      innerHTML: 'Home',
      style: {
        fontWeight: '700',
      },
    }),
    item2: 'Route A',
    item3: 'Route B',
  },
}).appendTo(document.body);`
});
class BreadcrumbsSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "breadcrumbs"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Breadcrumbs" }),
            description: new SectionDescription({
              innerHTML: "A simple breadcrumbs component."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$e,
                      codeExample: codeExample$e
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$d = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    button: new Button({
      innerHTML: "Click me",
      events: {
        click: () => alert("Button clicked!")
      }
    })
  }
});
const codeExample$d = new CodeExample({
  language: "typescript",
  content: `import { Button } from '@nathanssantos/pure-components';

new Button({
  innerHTML: 'Click me',
  events: {
    click: () => alert('Button clicked!'),
  },
}).appendTo(document.body);`
});
class ButtonSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "button"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Button" }),
            description: new SectionDescription({
              innerHTML: "A simple button."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$d,
                      codeExample: codeExample$d
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$c = new Component({
  style: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  children: {
    checkbox1: new Checkbox({
      label: {
        innerHTML: "Option 1"
      },
      field: {
        attributes: {
          name: "checkbox-example-1"
        }
      }
    }),
    checkbox2: new Checkbox({
      label: {
        innerHTML: "Option 2"
      },
      field: {
        attributes: {
          name: "checkbox-example-2"
        }
      }
    }),
    checkbox3: new Checkbox({
      label: {
        innerHTML: "Option 3"
      },
      field: {
        attributes: {
          name: "checkbox-example-3"
        }
      }
    }),
    checkbox4: new Checkbox({
      label: {
        innerHTML: "Option 4"
      },
      field: {
        attributes: {
          name: "checkbox-example-4"
        }
      }
    })
  }
});
const codeExample$c = new CodeExample({
  language: "typescript",
  content: `import { Component, Checkbox } from '@nathanssantos/pure-components';

new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  children: {
    checkbox1: new Checkbox({
      label: {
        innerHTML: 'Option 1',
      },
      field: {
        attributes: {
          name: 'checkbox-example-1',
        },
      },
    }),
    checkbox2: new Checkbox({
      label: {
        innerHTML: 'Option 2',
      },
      field: {
        attributes: {
          name: 'checkbox-example-2',
        },
      },
    }),
    checkbox3: new Checkbox({
      label: {
        innerHTML: 'Option 3',
      },
      field: {
        attributes: {
          name: 'checkbox-example-3',
        },
      },
    }),
    checkbox4: new Checkbox({
      label: {
        innerHTML: 'Option 4',
      },
      field: {
        attributes: {
          name: 'checkbox-example-4',
        },
      },
    }),
  },
}).appendTo(document.body);`
});
class CheckboxSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "checkbox"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Checkbox" }),
            description: new SectionDescription({
              innerHTML: "A simple checkbox input."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$c,
                      codeExample: codeExample$c
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$b = new Component({
  innerHTML: "I'm a generic component.",
  style: {
    backgroundColor: "var(--pc-success)",
    padding: "1.5rem",
    color: "#222",
    fontWeight: "bold",
    borderRadius: "0.25rem",
    textAlign: "center",
    cursor: "pointer"
  },
  events: {
    click: ({ setStyle, target }) => {
      target.innerHTML = "I can do anything.";
      setStyle({ backgroundColor: "var(--pc-info)" });
    },
    mouseleave: ({ setStyle, target }) => {
      target.innerHTML = "I'm a generic component.";
      setStyle({ backgroundColor: "var(--pc-success)" });
    }
  }
});
const codeExample$b = new CodeExample({
  language: "typescript",
  content: `import { Component } from '@nathanssantos/pure-components';

new Component({
  innerHTML: "I'm a generic component.",
  style: {
    backgroundColor: 'var(--pc-success)',
    padding: '1.5rem',
    color: '#222',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    textAlign: 'center',
    cursor: 'pointer',
  },
  events: {
    click: ({ setStyle, target }) => {
      target.innerHTML = 'I can do anything.';
      setStyle({ backgroundColor: 'var(--pc-info)' });
    },
    mouseleave: ({ setStyle, target }) => {
      target.innerHTML = "I'm a generic component.";
      setStyle({ backgroundColor: 'var(--pc-success)' });
    },
  },
}).appendTo(document.body);`
});
class ComponentSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "component"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Component" }),
            description: new SectionDescription({
              innerHTML: "A generic component that can be anything."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$b,
                      codeExample: codeExample$b
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$a = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    container: new Container({
      style: {
        base: {
          maxWidth: "17.5rem"
        },
        md: {
          maxWidth: "37.5rem"
        }
      },
      innerHTML: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum? Accusantium culpa incidunt maxime quae natus at placeat itaque error tenetur ab, optio saepe illum soluta porro temporibus. Voluptatum vitae officiis delectus molestiae error fuga eos debitis."
    })
  }
});
const codeExample$a = new CodeExample({
  language: "typescript",
  content: `import { Container } from '@nathanssantos/pure-components';

new Container({
  style: {
    base: {
      maxWidth: '17.5rem',
    },
    md: {
      maxWidth: '37.5rem',
    },
  },
  innerHTML:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, labore dignissimos at explicabo consequatur cum quis vero modi, et reiciendis ab reprehenderit ullam facere natus ducimus accusamus laboriosam a nihil in dolorem molestiae alias facilis voluptate? Iste saepe a aut nihil, ipsam odio esse, fuga eaque quisquam minus quibusdam est culpa reprehenderit ullam! Tempore itaque optio est, sint ex doloremque qui reiciendis assumenda distinctio, deserunt officia ab, dignissimos soluta quae amet incidunt illum? Accusantium culpa incidunt maxime quae natus at placeat itaque error tenetur ab, optio saepe illum soluta porro temporibus. Voluptatum vitae officiis delectus molestiae error fuga eos debitis.',
}).appendTo(document.body);`
});
class ContainerSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "container"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Container" }),
            description: new SectionDescription({
              innerHTML: "A simple container."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$a,
                      codeExample: codeExample$a
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const drawer = new Drawer({
  header: {
    innerHTML: "Drawer Header",
    style: {
      justifyContent: "space-between"
    }
  },
  body: {
    innerHTML: "Drawer Body"
  },
  footer: {
    innerHTML: "Drawer Footer"
  }
});
const button$1 = new Button({ innerHTML: "Open drawer", events: { click: drawer.open } });
const componentExample$9 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    button: button$1,
    drawer
  }
});
const codeExample$9 = new CodeExample({
  language: "typescript",
  content: `import { Button, Drawer } from '@nathanssantos/pure-components';

const drawer = new Drawer({
  header: {
    innerHTML: 'Drawer Header',
    style: {
      justifyContent: 'space-between',
    },
  },
  body: {
    innerHTML: 'Drawer Body',
  },
  footer: {
    innerHTML: 'Drawer Footer',
  },
});

drawer.appendTo(document.body);

new Button({ innerHTML: 'Open drawer', events: { click: drawer.open } }).appendTo(document.body);`
});
class DrawerSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "drawer"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Drawer" }),
            description: new SectionDescription({
              innerHTML: "A simple drawer."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$9,
                      codeExample: codeExample$9
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$8 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    header: new Header({
      style: {
        position: "relative"
      },
      leftContent: {
        children: {
          button: new Button({
            style: {
              padding: "0.5rem"
            },
            innerHTML: '<svg viewBox="0 0 24 24" style="height: 1.25rem; width: 1.25rem;"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>'
          })
        }
      },
      centerContent: {
        innerHTML: "Center Content"
      },
      rightContent: {
        children: {
          avatar: new Avatar({
            image: {
              attributes: {
                src: "https://i.pravatar.cc/300"
              }
            },
            name: {
              innerHTML: "John Doe"
            },
            description: {
              innerHTML: "john@doe.com"
            }
          })
        }
      }
    })
  }
});
const codeExample$8 = new CodeExample({
  language: "typescript",
  content: `import { Avatar, Button, Header } from '@nathanssantos/pure-components';

new Header({
  style: {
    position: 'relative',
  },
  leftContent: {
    children: {
      button: new Button({
        style: {
          padding: '0.5rem',
        },
        innerHTML: '<svg viewBox="0 0 24 24" style="height: 1.25rem; width: 1.25rem;"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>',
      }),
    },
  },
  centerContent: {
    innerHTML: 'Center Content',
  },
  rightContent: {
    children: {
      avatar: new Avatar({
        image: {
          attributes: {
            src: 'https://i.pravatar.cc/300',
          },
        },
        name: {
          innerHTML: 'John Doe',
        },
        description: {
          innerHTML: 'john@doe.com',
        },
      }),
    },
  },
}).appendTo(document.body);`
});
class HeaderSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "header"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Header" }),
            description: new SectionDescription({
              innerHTML: "A simple header."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$8,
                      codeExample: codeExample$8
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const simpleInput = new Input({
  field: {
    attributes: {
      value: "Simple Input"
    }
  },
  style: {
    minWidth: "10rem"
  }
});
const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>';
const visibilityOnIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';
const visibilityOffIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>';
const btToggleInputType = new Component({
  innerHTML: visibilityOffIcon,
  style: {
    display: "flex",
    padding: "0.5rem",
    cursor: "pointer"
  }
});
const passwordInput = new Input({
  field: {
    attributes: {
      type: "password",
      value: "password_here"
    },
    events: {
      input: (_, event) => {
        console.log(event.target.value);
      }
    }
  },
  label: {
    innerHTML: "Password"
  },
  leftSlot: {
    innerHTML: lockIcon
  },
  rightSlot: {
    children: {
      btToggleInputType
    }
  },
  style: {
    minWidth: "10rem"
  }
});
const handleToggleInputType = (button) => {
  const inputField = passwordInput.children.fieldWrapper.children.field;
  const currentInputType = inputField.target.getAttribute("type");
  inputField.setAttributes({ type: currentInputType === "password" ? "text" : "password" });
  button.target.innerHTML = currentInputType === "password" ? visibilityOnIcon : visibilityOffIcon;
};
btToggleInputType.bindEvents({
  click: handleToggleInputType
});
const componentExample$7 = new Component({
  style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem"
  },
  children: {
    simpleInput,
    passwordInput
  }
});
const codeExample$7 = new CodeExample({
  language: "typescript",
  content: `import { Input, Component } from '@nathanssantos/pure-components';

const simpleInput = new Input({
  field: {
    attributes: {
      value: 'Simple Input',
    },
  },
});

const lockIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>';

const visibilityOnIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';

const visibilityOffIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>';

const btToggleInputType = new Component({
  innerHTML: visibilityOffIcon,
  style: {
    display: 'flex',
    padding: '0.5rem',
    cursor: 'pointer',
  },
});

const passwordInput = new Input({
  field: {
    attributes: {
      type: 'password',
      value: 'password_here',
    },
    events: {
      input: (_, event: Event) => {
        console.log((event.target as HTMLInputElement).value);
      },
    },
  },
  label: {
    innerHTML: 'Password',
  },
  leftSlot: {
    innerHTML: lockIcon,
  },
  rightSlot: {
    children: {
      btToggleInputType,
    },
  },
});

const handleToggleInputType = (button: Component) => {
  const inputField = passwordInput.children.fieldWrapper.children.field;
  const currentInputType = inputField.target.getAttribute('type');

  inputField.setAttributes({ type: currentInputType === 'password' ? 'text' : 'password' });

  button.target.innerHTML =
    currentInputType === 'password' ? visibilityOnIcon : visibilityOffIcon;
};

btToggleInputType.bindEvents({
  click: handleToggleInputType,
});

document.body.append(
  simpleInput.target,
  passwordInput.target,
);`
});
class InputSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "input"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Input" }),
            description: new SectionDescription({
              innerHTML: "Input with label and slots on both sides."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$7,
                      codeExample: codeExample$7
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

class InstallSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "install"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Installation" }),
            description: new SectionDescription({
              innerHTML: "To use Pure Components in your project, run one of the following commands in your terminal:"
            }),
            codeExampleYarn: new CodeExample({
              content: "$ yarn add @nathanssantos/pure-components",
              language: "bash",
              style: {
                marginBottom: "1rem"
              }
            }),
            codeExampleNpm: new CodeExample({
              content: "$ npm install @nathanssantos/pure-components",
              language: "bash",
              style: {
                marginBottom: "3rem"
              }
            }),
            description2: new SectionDescription({
              innerHTML: "Import styles in your app's entry point:"
            }),
            styleImport: new CodeExample({
              content: 'import "@nathanssantos/pure-components/style.css";',
              style: {
                marginBottom: "3rem"
              }
            }),
            description3: new SectionDescription({
              innerHTML: "Import Inter font:"
            }),
            fontImport: new CodeExample({
              content: `&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"&gt;`,
              style: {
                marginBottom: "3rem"
              }
            })
          }
        })
      }
    });
  }
}

const modal = new Modal({
  header: {
    innerHTML: "Modal Header",
    style: {
      justifyContent: "space-between"
    }
  },
  body: {
    innerHTML: "Modal Body"
  },
  footer: {
    innerHTML: "Modal Footer"
  }
});
const button = new Button({ innerHTML: "Open modal", events: { click: modal.open } });
const componentExample$6 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    button,
    modal
  }
});
const codeExample$6 = new CodeExample({
  language: "typescript",
  content: `import { Button, Modal } from '@nathanssantos/pure-components';

const modal = new Modal({
  header: {
    innerHTML: 'Modal Header',
    style: {
      justifyContent: 'space-between',
    },
  },
  body: {
    innerHTML: 'Modal Body',
  },
  footer: {
    innerHTML: 'Modal Footer',
  },
});

modal.appendTo(document.body);

new Button({ innerHTML: 'Open modal', events: { click: modal.open } }).appendTo(document.body);`
});
class ModalSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "modal"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Modal" }),
            description: new SectionDescription({
              innerHTML: "A simple modal."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$6,
                      codeExample: codeExample$6
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const progress = new Progress();
progress.setValue(42);
const componentExample$5 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    progress
  }
});
const codeExample$5 = new CodeExample({
  language: "typescript",
  content: `import { Progress } from '@nathanssantos/pure-components';

const progress = new Progress();

progress.setValue(42);

progress.appendTo(document.body);`
});
class ProgressSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "progress"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Progress" }),
            description: new SectionDescription({
              innerHTML: "A simple progress bar."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$5,
                      codeExample: codeExample$5
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$4 = new Component({
  style: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  children: {
    radio1: new Radio({
      label: {
        innerHTML: "Option 1"
      },
      field: {
        attributes: {
          name: "radio-example"
        }
      }
    }),
    radio2: new Radio({
      label: {
        innerHTML: "Option 2"
      },
      field: {
        attributes: {
          name: "radio-example"
        }
      }
    }),
    radio3: new Radio({
      label: {
        innerHTML: "Option 3"
      },
      field: {
        attributes: {
          name: "radio-example"
        }
      }
    }),
    radio4: new Radio({
      label: {
        innerHTML: "Option 4"
      },
      field: {
        attributes: {
          name: "radio-example"
        }
      }
    })
  }
});
const codeExample$4 = new CodeExample({
  language: "typescript",
  content: `import { Component, Radio } from '@nathanssantos/pure-components';

new Component({
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  children: {
    radio1: new Radio({
      label: {
        innerHTML: 'Option 1',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio2: new Radio({
      label: {
        innerHTML: 'Option 2',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio3: new Radio({
      label: {
        innerHTML: 'Option 3',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
    radio4: new Radio({
      label: {
        innerHTML: 'Option 4',
      },
      field: {
        attributes: {
          name: 'radio-example',
        },
      },
    }),
  },
}).appendTo(document.body);`
});
class RadioSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "radio"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Radio" }),
            description: new SectionDescription({
              innerHTML: "A simple radio input."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$4,
                      codeExample: codeExample$4
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const simpleSelect = new Select({
  field: {
    children: {
      placeholder: new Component({
        tagName: "option",
        innerHTML: "Select",
        attributes: { value: "" }
      }),
      option1: new Component({
        tagName: "option",
        innerHTML: "Option 1",
        attributes: { value: "1" }
      }),
      option2: new Component({
        tagName: "option",
        innerHTML: "Option 2",
        attributes: { value: "2" }
      }),
      option3: new Component({
        tagName: "option",
        innerHTML: "Option 3",
        attributes: { value: "3" }
      }),
      option4: new Component({
        tagName: "option",
        innerHTML: "Option 4",
        attributes: { value: "4" }
      })
    }
  },
  style: {
    minWidth: "10rem"
  }
});
const i18nIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>';
const selectWithSlots = new Select({
  field: {
    children: {
      option1: new Component({
        tagName: "option",
        innerHTML: "Option 1",
        attributes: { value: "1" }
      }),
      option2: new Component({
        tagName: "option",
        innerHTML: "Option 2",
        attributes: { value: "2" }
      }),
      option3: new Component({
        tagName: "option",
        innerHTML: "Option 3",
        attributes: { value: "3" }
      }),
      option4: new Component({
        tagName: "option",
        innerHTML: "Option 4",
        attributes: { value: "4" }
      })
    },
    events: {
      change: (_, event) => {
        console.log(event.target.value);
      }
    }
  },
  label: {
    innerHTML: "Language"
  },
  leftSlot: {
    innerHTML: i18nIcon
  },
  style: {
    minWidth: "10rem"
  }
});
const componentExample$3 = new Component({
  style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem"
  },
  children: {
    simpleSelect,
    selectWithSlots
  }
});
const codeExample$3 = new CodeExample({
  language: "typescript",
  content: `import { Select, Component } from '@nathanssantos/pure-components';

const simpleSelect = new Select({
  field: {
    children: {
      placeholder: new Component({
        tagName: 'option',
        innerHTML: 'Select',
        attributes: { value: '' },
      }),
      option1: new Component({
        tagName: 'option',
        innerHTML: 'Option 1',
        attributes: { value: '1' },
      }),
      option2: new Component({
        tagName: 'option',
        innerHTML: 'Option 2',
        attributes: { value: '2' },
      }),
      option3: new Component({
        tagName: 'option',
        innerHTML: 'Option 3',
        attributes: { value: '3' },
      }),
      option4: new Component({
        tagName: 'option',
        innerHTML: 'Option 4',
        attributes: { value: '4' },
      }),
    },
  },
  style: {
    minWidth: '10rem',
  },
});

const i18nIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>';

const selectWithSlots = new Select({
  field: {
    children: {
      option1: new Component({
        tagName: 'option',
        innerHTML: 'Option 1',
        attributes: { value: '1' },
      }),
      option2: new Component({
        tagName: 'option',
        innerHTML: 'Option 2',
        attributes: { value: '2' },
      }),
      option3: new Component({
        tagName: 'option',
        innerHTML: 'Option 3',
        attributes: { value: '3' },
      }),
      option4: new Component({
        tagName: 'option',
        innerHTML: 'Option 4',
        attributes: { value: '4' },
      }),
    },
    events: {
      change: (_, event: Event) => {
        console.log((event.target as HTMLSelectElement).value);
      },
    },
  },
  label: {
    innerHTML: 'Language',
  },
  leftSlot: {
    innerHTML: i18nIcon,
  },
  style: {
    minWidth: '10rem',
  },
});

document.body.append(
  simpleSelect.target,
  selectWithSlots.target,
);`
});
class SelectSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "select"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Select" }),
            description: new SectionDescription({
              innerHTML: "Select with label and slots on both sides."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$3,
                      codeExample: codeExample$3
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$2 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    tabs: new Tabs({
      tabList: {
        children: {
          tab1: new Tab({
            innerHTML: "Tab 1"
          }),
          tab2: new Tab({
            innerHTML: "Tab 2"
          }),
          tab3: new Tab({
            innerHTML: "Tab 3"
          })
        }
      },
      tabPanels: {
        children: {
          panel1: new TabPanel({
            innerHTML: "TabPanel 1"
          }),
          panel2: new TabPanel({
            innerHTML: "TabPanel 2"
          }),
          panel3: new TabPanel({
            innerHTML: "TabPanel 3"
          })
        }
      }
    })
  }
});
const codeExample$2 = new CodeExample({
  language: "typescript",
  content: `import { Tab, TabPanel, Tabs } from '@nathanssantos/pure-components';

new Tabs({
  tabList: {
    children: {
      tab1: new Tab({
        innerHTML: 'Tab 1',
      }),
      tab2: new Tab({
        innerHTML: 'Tab 2',
      }),
      tab3: new Tab({
        innerHTML: 'Tab 3',
      }),
    },
  },
  tabPanels: {
    children: {
      panel1: new TabPanel({
        innerHTML: 'TabPanel 1',
      }),
      panel2: new TabPanel({
        innerHTML: 'TabPanel 2',
      }),
      panel3: new TabPanel({
        innerHTML: 'TabPanel 3',
      }),
    },
  },
}).appendTo(document.body);`
});
class TabsSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "tabs"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Tabs" }),
            description: new SectionDescription({
              innerHTML: "A simple tabs component."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$2,
                      codeExample: codeExample$2
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const componentExample$1 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    tag: new Tag({
      innerHTML: "I'm a tag",
      style: {
        backgroundColor: "var(--pc-error)"
      }
    })
  }
});
const codeExample$1 = new CodeExample({
  language: "typescript",
  content: `import { Tag } from '@nathanssantos/pure-components';

new new Tag({
  innerHTML: "I'm a tag",
  style: {
    backgroundColor: 'var(--pc-error)'
  }
}).appendTo(document.body);`
});
class TagSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "tag"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Tag" }),
            description: new SectionDescription({
              innerHTML: "A simple tag."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample: componentExample$1,
                      codeExample: codeExample$1
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

const controlledToast = new Toast({
  title: {
    innerHTML: "Toast"
  },
  description: {
    innerHTML: "Controlled toast"
  }
});
const componentExample = new Component({
  style: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem"
  },
  children: {
    positioning: new Component({
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "calc(var(--pc-spacing) * 2)"
      },
      children: {
        title: new Component({
          innerHTML: "Positions",
          style: { width: "100%" }
        }),
        toastTopLeft: new Button({
          innerHTML: "top-left",
          events: {
            click: () => Toast.trigger({
              position: "top-left",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Toast top left position and animation."
              }
            })
          }
        }),
        toastTopCenter: new Button({
          innerHTML: "top-center",
          events: {
            click: () => Toast.trigger({
              position: "top-center",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Toast top center position and animation."
              }
            })
          }
        }),
        toastTopRight: new Button({
          innerHTML: "top-right",
          events: {
            click: () => Toast.trigger({
              position: "top-right",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Toast top right position and animation."
              }
            })
          }
        }),
        toastBottomLeft: new Button({
          innerHTML: "bottom-left",
          events: {
            click: () => Toast.trigger({
              position: "bottom-left",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Toast bottom left position and animation."
              }
            })
          }
        }),
        toastBottomCenter: new Button({
          innerHTML: "bottom-center",
          events: {
            click: () => Toast.trigger({
              position: "bottom-center",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Toast bottom center position and animation."
              }
            })
          }
        }),
        toastBottomRight: new Button({
          innerHTML: "bottom-right",
          events: {
            click: () => Toast.trigger({
              position: "bottom-right",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Toast bottom right position and animation."
              }
            })
          }
        })
      }
    }),
    variants: new Component({
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "calc(var(--pc-spacing) * 2)"
      },
      children: {
        title: new Component({
          innerHTML: "Variants",
          style: { width: "100%" }
        }),
        toastVariantInfo: new Button({
          innerHTML: "info",
          style: {
            backgroundColor: "var(--pc-info)"
          },
          events: {
            click: () => {
              Toast.trigger({
                variant: "info",
                title: {
                  innerHTML: "Toast"
                },
                description: {
                  innerHTML: "Info"
                }
              });
            }
          }
        }),
        toastVariantSuccess: new Button({
          innerHTML: "success",
          style: {
            backgroundColor: "var(--pc-success)"
          },
          events: {
            click: () => Toast.trigger({
              variant: "success",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Success"
              }
            })
          }
        }),
        toastVariantWarning: new Button({
          innerHTML: "warning",
          style: {
            backgroundColor: "var(--pc-warning)"
          },
          events: {
            click: () => Toast.trigger({
              variant: "warning",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Warning"
              }
            })
          }
        }),
        toastVariantError: new Button({
          innerHTML: "error",
          style: {
            backgroundColor: "var(--pc-error)"
          },
          events: {
            click: () => Toast.trigger({
              variant: "error",
              title: {
                innerHTML: "Toast"
              },
              description: {
                innerHTML: "Error"
              }
            })
          }
        })
      }
    }),
    controlled: new Component({
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "calc(var(--pc-spacing) * 2)"
      },
      children: {
        title: new Component({
          innerHTML: "Controlled",
          style: { width: "100%" }
        }),
        controlletToastShow: new Button({
          innerHTML: "Show controlled toast",
          events: {
            click: controlledToast.show
          }
        }),
        controlletToastDismiss: new Button({
          innerHTML: "Dismiss controlled toast",
          events: {
            click: controlledToast.dismiss
          }
        })
      }
    })
  }
});
const codeExample = new CodeExample({
  language: "typescript",
  content: `import { Button, Toast } from '@nathanssantos/pure-components';

const btTriggerToast = new Button({
  innerHTML: 'Toast top right',
  events: {
    click: () => {
      Toast.trigger({
        position: 'top-right',
        variant: 'success',
        title: {
          innerHTML: 'Toast',
        },
        description: {
          innerHTML: 'Toast top right position and animation.',
        },
      }),
    }
  },
});

const controlledToast = new Toast({
  title: {
    innerHTML: 'Toast',
  },
  description: {
    innerHTML: 'Toast top left position and controlled animation.',
  },
});

const btShowControlledToast = new Button({
  innerHTML: 'Show controlled toast',
  events: {
    click: controlledToast.show,
  },
});

const btDismissControlledToast = new Button({
  innerHTML: 'Dismiss controlled toast',
  events: {
    click: controlledToast.dismiss,
  },
});

document.body.append(
  btTriggerToast.target,
  btShowControlledToast.target,
  btDismissControlledToast.target
);`
});
class ToastSection extends Component {
  constructor() {
    super({
      attributes: {
        id: "toast"
      },
      style: {
        paddingTop: "4rem"
      },
      children: {
        container: new Container({
          children: {
            title: new SectionTitle({ innerHTML: "Toast" }),
            description: new SectionDescription({
              innerHTML: "A super toast."
            }),
            tabs: new Tabs({
              tabList: {
                children: {
                  tab1: new Tab({
                    innerHTML: "Usage"
                  }),
                  tab2: new Tab({
                    innerHTML: "Props"
                  })
                }
              },
              tabPanels: {
                children: {
                  panel1: new TabPanel({
                    style: {
                      gap: "1rem"
                    },
                    children: {
                      componentExample,
                      codeExample
                    }
                  }),
                  panel2: new TabPanel({
                    innerHTML: "Coming soon."
                  })
                }
              }
            })
          }
        })
      }
    });
  }
}

class HomeScreen extends Component {
  constructor() {
    super({
      style: {
        paddingBottom: "6rem"
      },
      children: {
        heroGetStarted: new Hero({ title: "Get Started" }),
        installSection: new InstallSection(),
        heroComponents: new Hero({
          title: "Components",
          description: "Pure Components provide prebuild components to help you build your projects faster.<br>Here is a list with examples:"
        }),
        components: new Component({
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "4rem"
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
            toastSection: new ToastSection()
          }
        })
      }
    });
  }
}

class Router extends Component {
  initialRoute = "mainScreen";
  routes = {
    mainScreen: {
      component: new HomeScreen(),
      name: "Home"
    }
  };
  constructor() {
    super({
      className: "router",
      children: {
        layout: new Layout()
      }
    });
  }
  navigate = (screenName = this.initialRoute) => {
    for (const screen of Object.values(this.children.layout.children.screens.children)) {
      screen.target.remove();
    }
    this.children.layout.children.screens.appendChildren({
      [screenName]: this.routes[screenName].component
    });
  };
}
const router = new Router();

const style = '';

class Documentation extends Component {
  constructor() {
    super({
      className: "documentation",
      children: {
        router
      }
    });
    this.appendTo(document.querySelector("#app"));
    router.navigate();
  }
  static init = () => {
    new Documentation();
  };
}
Documentation.init();

hljs.highlightAll();
//# sourceMappingURL=index.js.map
