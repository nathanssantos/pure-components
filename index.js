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

const style$b = '';

const style$a = '';

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

const style$9 = '';

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

const style$8 = '';

class Container extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `container${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$7 = '';

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

const style$6 = '';

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

const style$5 = '';

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

const style$4 = '';

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

const style$3 = '';

class TabPanel extends Component {
  constructor(props = {}) {
    const { className, ...rest } = props;
    super({
      className: `tab-panel${className?.length ? ` ${className}` : ""}`,
      ...rest
    });
  }
}

const style$2 = '';

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

const header = new Header({
  leftContent: {
    children: {
      logo: new Component({
        innerHTML: "Pure Components",
        style: {
          fontWeight: "bold",
          base: {
            fontSize: "1rem"
          },
          md: {
            fontSize: "1.25rem"
          }
        }
      })
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
          fontSize: "0.875rem"
        },
        md: {
          fontSize: "1rem"
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
        whiteSpace: "break-spaces",
        backgroundColor: "#3f3f3f",
        padding: "1rem",
        borderRadius: "0.25rem",
        margin: "0",
        base: {
          fontSize: "0.875rem"
        },
        md: {
          fontSize: "1rem"
        },
        ...props.style
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

const componentExample$8 = new Component({
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
const codeExample$8 = new CodeExample({
  innerHTML: `import { Avatar } from '@nathanssantos/pure-components';

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

const componentExample$7 = new Component({
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
const codeExample$7 = new CodeExample({
  innerHTML: `import { Button } from '@nathanssantos/pure-components';

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

const componentExample$6 = new Component({
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
const codeExample$6 = new CodeExample({
  innerHTML: `import { Component } from '@nathanssantos/pure-components';

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

const componentExample$5 = new Component({
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
const codeExample$5 = new CodeExample({
  innerHTML: `import { Container } from '@nathanssantos/pure-components';

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
const componentExample$4 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    button: button$1,
    drawer
  }
});
const codeExample$4 = new CodeExample({
  innerHTML: `import { Button, Drawer } from '@nathanssantos/pure-components';

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

const componentExample$3 = new Component({
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
const codeExample$3 = new CodeExample({
  innerHTML: `import { Avatar, Button, Header } from '@nathanssantos/pure-components';

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
        innerHTML:
          '<svg viewBox="0 0 24 24" style="height: 1.25rem; width: 1.25rem;"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path></svg>',
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
              innerHTML: "yarn add @nathanssantos/pure-components",
              style: {
                marginBottom: "1rem"
              }
            }),
            codeExampleNpm: new CodeExample({
              innerHTML: "npm install @nathanssantos/pure-components",
              style: {
                marginBottom: "1rem"
              }
            }),
            description2: new SectionDescription({
              innerHTML: "Import styles in your app's entry point:"
            }),
            styleImport: new CodeExample({
              innerHTML: 'import "@nathanssantos/pure-components/style.css";',
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
const componentExample$2 = new Component({
  style: {
    display: "flex",
    gap: "1rem"
  },
  children: {
    button,
    modal
  }
});
const codeExample$2 = new CodeExample({
  innerHTML: `import { Button, Modal } from '@nathanssantos/pure-components';

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
const codeExample$1 = new CodeExample({
  innerHTML: `import { Tab, TabPanel, Tabs } from '@nathanssantos/pure-components';

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
  innerHTML: `import { Button, Toast } from '@nathanssantos/pure-components';

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
            avatarSection: new AvatarSection(),
            buttonSection: new ButtonSection(),
            componentSection: new ComponentSection(),
            containerSection: new ContainerSection(),
            drawerSection: new DrawerSection(),
            headerSection: new HeaderSection(),
            modalSection: new ModalSection(),
            tabsSection: new TabsSection(),
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
//# sourceMappingURL=index.js.map
