export interface Size {
  width: number;
  height: number;
}

export const getSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const sizeToStrPx = ({ width, height }: Size) => ({
  width: numToStrPx(width),
  height: numToStrPx(height),
});

export const setSizeElement = (element: HTMLElement, size: Size) => {
  const { style } = element;
  const { width, height } = size;

  style.width = numToStrPx(width);
  style.height = numToStrPx(height);
};

export const numToStrPx = (value: number) => `${value}px`;

export default {
  getSize,
  sizeToStrPx,
  setSizeElement,
  numToStrPx,
};
