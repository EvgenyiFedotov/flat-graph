import React, { Component, ReactChildren, ReactElement } from 'react';
import { setSizeElement, getSizeWindow } from './flatGraph/common';
import ResizeWindow from './ResizeWindow';

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  canvas: HTMLElement = null;

  componentDidMount() {
    setSizeElement(this.canvas, getSizeWindow());
  }

  refCanvas = (canvas: HTMLElement) => (this.canvas = canvas);

  onResize = () => {
    console.log('@onResize');
  };

  render = () => {
    return (
      <div className="flat-graph">
        <ResizeWindow onResize={this.onResize} />
        <canvas ref={this.refCanvas} />
      </div>
    );
  };
}

export default FlatGraph;
