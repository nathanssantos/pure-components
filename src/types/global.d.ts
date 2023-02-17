type ComponentConstructorProps = {
  type?: string;
  className?: string | string[];
  children?: { [name: string]: import('../components/component').default };
  style?: Partial<CSSStyleDeclaration>;
  innerHTML?: string;
  transitionTime?: number;
  events?: { [name: string]: () => unknown };
};
