/* eslint-disable @typescript-eslint/no-explicit-any */
interface AvatarConstructorProps extends ComponentConstructorProps {
  description: Partial<ComponentConstructorProps>;
  image: Partial<ComponentConstructorProps>;
  imageWrapper: Partial<ComponentConstructorProps>;
  name: Partial<ComponentConstructorProps>;
  textWrapper: Partial<ComponentConstructorProps>;
}

interface ComponentConstructorProps {
  attributes: { [name: string]: string | boolean };
  children: { [name: string]: Component };
  className: string;
  events: {
    [name: string]: (instance: Component, event: Event) => unknown;
  };
  innerHTML: string;
  parent: Component;
  state: { [key: string]: any };
  style: Partial<CSSStyleDeclaration> | ResponsiveObject<Partial<CSSStyleDeclaration>>;
  tagName: string;
}

interface DrawerConstructorProps extends ComponentConstructorProps {
  body: Partial<ComponentConstructorProps>;
  btClose: Partial<ComponentConstructorProps>;
  content: Partial<ComponentConstructorProps>;
  footer: Partial<ComponentConstructorProps>;
  header: Partial<ComponentConstructorProps>;
  overlay: Partial<ComponentConstructorProps>;
}

interface HeaderConstructorProps extends ComponentConstructorProps {
  leftContent: Partial<ComponentConstructorProps>;
  centerContent: Partial<ComponentConstructorProps>;
  rightContent: Partial<ComponentConstructorProps>;
  container: Partial<ComponentConstructorProps>;
}

interface ModalConstructorProps extends ComponentConstructorProps {
  body: Partial<ComponentConstructorProps>;
  btClose: Partial<ComponentConstructorProps>;
  content: Partial<ComponentConstructorProps>;
  footer: Partial<ComponentConstructorProps>;
  header: Partial<ComponentConstructorProps>;
  overlay: Partial<ComponentConstructorProps>;
}

interface ResponsiveObject<T> {
  base: T;
  md: T;
  sm: T;
  lg: T;
  xl: T;
}

interface TabConstructorProps extends ComponentConstructorProps {
  activityIndicator: Partial<ComponentConstructorProps>;
}

interface TabsConstructorProps extends ComponentConstructorProps {
  activeTabIndex: number;
  tabList: Partial<ComponentConstructorProps>;
  tabPanels: Partial<ComponentConstructorProps>;
}

declare class Component {
  children: ComponentConstructorProps['children'];
  id: string;
  state: ComponentConstructorProps['state'];
  target: HTMLElement;
  constructor(props?: Partial<ComponentConstructorProps>);
  appendChildren: (payload: ComponentConstructorProps['children']) => void;
  appendTo: (target: HTMLElement) => void;
  bindEvents: (payload: ComponentConstructorProps['events']) => Promise<void>;
  static create: (payload?: Partial<ComponentConstructorProps>) => Component;
  destroy: () => void;
  fadeIn: (to?: ComponentConstructorProps['style']) => Promise<unknown>;
  fadeOut: (to?: ComponentConstructorProps['style']) => Promise<unknown>;
  hide: () => void;
  prependChildren: (payload: ComponentConstructorProps['children']) => void;
  prependTo: (target: HTMLElement) => void;
  setAttributes: (payload: ComponentConstructorProps['attributes']) => void;
  setState: (payload: typeof this.state) => void;
  setStyle: (payload: ComponentConstructorProps['style']) => void;
  show: () => void;
}

declare class Avatar extends Component {
  constructor(props?: Partial<AvatarConstructorProps>);
  private assemble;
  private init;
}

declare class Button extends Component {
  constructor(props?: Partial<ComponentConstructorProps>);
}

declare class Container extends Component {
  constructor(props?: Partial<ComponentConstructorProps>);
}

declare class Drawer extends Component {
  constructor(props?: Partial<DrawerConstructorProps>);
  private assemble;
  close: () => Promise<void>;
  private init;
  open: () => Promise<void>;
}

declare class Header extends Component {
  constructor(props?: Partial<HeaderConstructorProps>);
  private assemble;
  private init;
}

declare class Modal extends Component {
  constructor(props?: Partial<ModalConstructorProps>);
  private assemble;
  close: () => Promise<void>;
  private init;
  open: () => Promise<void>;
}

declare class Tab extends Button {
  isActive: boolean;
  constructor(props?: Partial<TabConstructorProps>);
  private assemble;
  private init;
  setActive: (isActive: boolean) => void;
}

declare class TabPanel extends Component {
  constructor(props?: Partial<ComponentConstructorProps>);
}

declare class Tabs extends Component {
  activeTabIndex: number;
  constructor(props?: Partial<TabsConstructorProps>);
  private assemble;
  private init;
  setActiveTabIndex: (activeTabIndex: TabsConstructorProps['activeTabIndex']) => void;
}

export { Avatar, Button, Component, Container, Drawer, Header, Modal, Tab, TabPanel, Tabs };
