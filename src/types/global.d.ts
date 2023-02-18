type AvatarConstructorProps = {
  description?: ComponentConstructorProps;
  image?: ComponentConstructorProps;
  imageContainer?: ComponentConstructorProps;
  name?: ComponentConstructorProps;
  textContainer?: ComponentConstructorProps;
};

type ComponentConstructorProps = {
  attributes?: { [name: string]: string };
  children?: { [name: string]: import('../components/component').default };
  className?: string | string[];
  events?: { [name: string]: () => unknown };
  innerHTML?: string;
  style?: Partial<CSSStyleDeclaration>;
  transitionTime?: number;
  tagName?: string;
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
