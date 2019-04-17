import { ReactElement, Children, cloneElement } from 'react';

export type Position = [number, number];

export const cloneChildren = (children: any) => (getPropsChild: Function = () => null) => Children.toArray(children).reduce((result: any[], element: ReactElement, index: number) => {
  result.push(cloneElement(element, getPropsChild(element, index)));

  return result;
}, []);

export default { cloneChildren };
