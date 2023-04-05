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
  children: { [name: string]: import('../components/component').default | number | string };
  className: string;
  events: {
    [name: string]: (
      instance: import('../components/component').default,
      event: Event,
    ) => unknown;
  };
  innerHTML: string | number;
  parent: import('../components/component').default;
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

interface InputConstructorProps extends ComponentConstructorProps {
  fieldWrapper: Partial<ComponentConstructorProps>;
  field: Partial<ComponentConstructorProps>;
  label: Partial<ComponentConstructorProps>;
  leftSlot: Partial<ComponentConstructorProps>;
  rightSlot: Partial<ComponentConstructorProps>;
}

interface ModalConstructorProps extends ComponentConstructorProps {
  body: Partial<ComponentConstructorProps>;
  btClose: Partial<ComponentConstructorProps>;
  content: Partial<ComponentConstructorProps>;
  footer: Partial<ComponentConstructorProps>;
  header: Partial<ComponentConstructorProps>;
  overlay: Partial<ComponentConstructorProps>;
}

interface ProgressConstructorProps extends ComponentConstructorProps {
  fill: Partial<ComponentConstructorProps>;
  value: Partial<ComponentConstructorProps>;
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

interface TabConstructorProps extends ComponentConstructorProps {
  activityIndicator: Partial<ComponentConstructorProps>;
}

interface TabsConstructorProps extends ComponentConstructorProps {
  activeTabIndex: number;
  tabList: Partial<ComponentConstructorProps>;
  tabPanels: Partial<ComponentConstructorProps>;
}

interface ToastConstructorProps extends ComponentConstructorProps {
  title: Partial<ComponentConstructorProps>;
  description: Partial<ComponentConstructorProps>;
  variant: 'success' | 'error' | 'warning' | 'info';

  position:
    | 'top-right'
    | 'top-left'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-left'
    | 'bottom-center';
  duration: number;
}
