type ComponentConstructorProps = {
  type?: string;
  className?: string | string[];
  children?: { [name: string]: import('../components/component').default };
  style?: Partial<CSSStyleDeclaration>;
  innerHTML?: string;
  transitionTime?: number;
  events?: { [name: string]: () => unknown };
};

type DrawerConstructorProps = {
  body?: ComponentConstructorProps;
  btClose?: ComponentConstructorProps;
  content?: ComponentConstructorProps;
  footer?: ComponentConstructorProps;
  header?: ComponentConstructorProps;
  overlay?: ComponentConstructorProps;
};

type ModalConstructorProps = {
  body?: ComponentConstructorProps;
  btClose?: ComponentConstructorProps;
  content?: ComponentConstructorProps;
  footer?: ComponentConstructorProps;
  header?: ComponentConstructorProps;
  overlay?: ComponentConstructorProps;
};
