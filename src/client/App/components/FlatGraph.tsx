import React, { Component, ReactChildren, ReactElement } from 'react';

interface Size {
  width: number;
  height: number;
}

const getSizeWindow = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const setSizeElement = (element: HTMLElement, size: Size) => {
  const { style } = element;
  const { width, height } = size;

  style.width = numToStrPx(width);
  style.height = numToStrPx(height);
};

const numToStrPx = (value: number) => `${value}px`;

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  canvas: HTMLElement = null;

  componentDidMount() {
    setSizeElement(this.canvas, getSizeWindow());
  }

  refCanvas = (canvas: HTMLElement) => (this.canvas = canvas);

  render = () => {
    return (
      <div className="flat-graph">
        <canvas ref={this.refCanvas} />
      </div>
    );
  };
}

export default FlatGraph;
