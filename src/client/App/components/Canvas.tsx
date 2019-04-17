import React, { Component } from 'react';
import WindowSize from './WindowSize';
import { sizeToStrPx } from './windowSize/common';

class Canvas extends Component {
  canvas: HTMLCanvasElement;

  canvasContext: CanvasRenderingContext2D;

  ref = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  };

  render = () => {
    return (
      <WindowSize getChildProps={sizeToStrPx}>
        <canvas ref={this.ref} />
      </WindowSize>
    );
  };
}

export default Canvas;
