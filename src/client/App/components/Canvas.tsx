import React, { Component, Children, ReactElement, Fragment, cloneElement } from 'react';
import WindowSize from './WindowSize';
import { sizeToStrPx } from './windowSize/common';

class Canvas extends Component {
  canvas: HTMLCanvasElement;

  canvasContext: CanvasRenderingContext2D;

  componentDidMount() {
    this.forceUpdate();
  }

  ref = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  };

  onResize = () => this.forceUpdate();

  render = () => {
    const { children } = this.props;

    return (
      <Fragment>
        <WindowSize getChildProps={sizeToStrPx} onResize={this.onResize}>
          <canvas ref={this.ref} />
        </WindowSize>

        {!!this.canvasContext &&
          Children.toArray(children).reduce((result: any[], element: ReactElement) => {
            result.push(
              cloneElement(element, {
                canvasContext: this.canvasContext,
              }),
            );

            return result;
          }, [])}
      </Fragment>
    );
  };
}

export default Canvas;
