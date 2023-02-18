interface AvatarConstructorProps extends ComponentConstructorProps {
  description: Partial<ComponentConstructorProps>;
  image: Partial<ComponentConstructorProps>;
  imageContainer: Partial<ComponentConstructorProps>;
  name: Partial<ComponentConstructorProps>;
  textContainer: Partial<ComponentConstructorProps>;
}

interface ButtonConstructorProps extends ComponentConstructorProps {
  label: Partial<ComponentConstructorProps>;
}

interface ComponentConstructorProps {
  attributes: { [name: string]: string | boolean };
  children: { [name: string]: import('../components/component').default };
  className: string;
  events: { [name: string]: () => unknown };
  innerHTML: string;
  style: Partial<CSSStyleDeclaration>;
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

interface ModalConstructorProps extends ComponentConstructorProps {
  body: Partial<ComponentConstructorProps>;
  btClose: Partial<ButtonConstructorProps>;
  content: Partial<ComponentConstructorProps>;
  footer: Partial<ComponentConstructorProps>;
  header: Partial<ComponentConstructorProps>;
  overlay: Partial<ComponentConstructorProps>;
}
