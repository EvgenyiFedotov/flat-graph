export interface Size {
  width: number;
  height: number;
}

export const getSizeWindow = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const setSizeElement = (element: HTMLElement, size: Size) => {
  const { style } = element;
  const { width, height } = size;

  style.width = numToStrPx(width);
  style.height = numToStrPx(height);
};

export const numToStrPx = (value: number) => `${value}px`;

export default {
  getSizeWindow,
  setSizeElement,
  numToStrPx,
};
