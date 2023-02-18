type AvatarConstructorProps = {
  description?: string;
  descriptionComponent?: ComponentConstructorProps;
  imageComponent?: ComponentConstructorProps;
  imageWrapperComponent?: ComponentConstructorProps;
  name?: string;
  nameComponent?: ComponentConstructorProps;
  size?: string;
  src?: string;
  textWrapperComponent?: ComponentConstructorProps;
};

type ComponentConstructorProps = {
  attributes?: { [name: string]: string };
  children?: { [name: string]: import('../components/component').default };
  className?: string | string[];
  events?: { [name: string]: () => unknown };
  innerHTML?: string;
  style?: Partial<CSSStyleDeclaration>;
  transitionTime?: number;
  type?: string;
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
