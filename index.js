const style$a = '';

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
      this.children[name] = component;
      this.target.append(component.target);
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
      this.children[name] = component;
      this.target.prepend(component.target);
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

const style$9 = '';

class Avatar extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `avatar${className?.length ? ` ${className}` : ""}`, ...rest });
    this.init(props);
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
  init = (payload) => {
    this.assemble(payload);
  };
}

const style$8 = '';

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

const style$7 = '';

class Container extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `container${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$6 = '';

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

const style$5 = '';

class Header extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `header${className?.length ? ` ${className}` : ""}`,
      tagName: "header",
      ...rest
    });
    this.init(props);
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
  init = (payload) => {
    this.assemble(payload);
  };
}

const style$4 = '';

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

const style$3 = '';

class Tab extends Button {
  isActive = false;
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({ className: `tab${className?.length ? ` ${className}` : ""}`, ...rest });
    this.init(props);
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
  init = async (payload) => {
    await this.assemble(payload);
  };
  setActive = (isActive) => {
    this.isActive = isActive;
    this.children.activityIndicator.setStyle({ width: isActive ? "100%" : "0" });
  };
}

const style$2 = '';

class TabPanel extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `tab-panel${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$1 = '';

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

const style = '';

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

export { Avatar, Button, Component, Container, Drawer, Header, Modal, Tab, TabPanel, Tabs, Toast };
//# sourceMappingURL=index.js.map
