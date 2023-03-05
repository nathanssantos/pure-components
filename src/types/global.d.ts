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
  children: { [name: string]: import('../components/component').default };
  className: string;
  events: { [name: string]: (instance: Component, event: Event) => unknown };
  innerHTML: string;
  parent: import('../components/component').default;
  state: { [key: string]: any };
  style: Partial<CSSStyleDeclaration> | ResponsiveObject<Partial<CSSStyleDeclaration>>;
  tagName: string;
}

interface DrawerConstructorProps extends ComponentConstructorProps {
  body: Partial<ComponentConstructorProps>;
  btClose: Partial<ButtonConstructorProps>;
  content: Partial<ComponentConstructorProps>;
  footer: Partial<ComponentConstructorProps>;
  header: Partial<ComponentConstructorProps>;
  overlay: Partial<ComponentConstructorProps>;
}

interface LayoutConstructorProps extends ComponentConstructorProps {
  leftContent: Partial<ComponentConstructorProps>;
  centerContent: Partial<ComponentConstructorProps>;
  rightContent: Partial<ComponentConstructorProps>;
  container: Partial<ComponentConstructorProps>;
}

interface HeaderConstructorProps extends ComponentConstructorProps {
  leftContent: Partial<ComponentConstructorProps>;
  centerContent: Partial<ComponentConstructorProps>;
  rightContent: Partial<ComponentConstructorProps>;
  container: Partial<ComponentConstructorProps>;
}

interface ModalConstructorProps extends ComponentConstructorProps {
  body: Partial<ComponentConstructorProps>;
  btClose: Partial<ButtonConstructorProps>;
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

interface Route {
  component: import('../components/component').default;
  name: string;
}

interface RouterConstructorProps extends ComponentConstructorProps {
  leftContent: Partial<ComponentConstructorProps>;
  centerContent: Partial<ComponentConstructorProps>;
  rightContent: Partial<ComponentConstructorProps>;
  container: Partial<ComponentConstructorProps>;
}

interface TabsConstructorProps extends ComponentConstructorProps {
  tabList: Partial<ComponentConstructorProps>;
  tabPanels: Partial<ComponentConstructorProps>;
}
