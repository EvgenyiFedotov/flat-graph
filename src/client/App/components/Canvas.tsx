import React, { Component, Fragment } from 'react';
import WindowSize from './WindowSize';
import { sizeToStrPx } from './windowSize/common';
import { cloneChildren, Cursor } from './canvas/common';

interface Props {}

interface State {
  cursor?: Cursor;
}

class Canvas extends Component<Props, State> {
  canvas: HTMLCanvasElement;

  canvasContext: CanvasRenderingContext2D;

  constructor(props: Props) {
    super(props);

    this.state = {
      cursor: null,
    };
  }

  componentDidMount() {
    this.forceUpdate();

    this.canvas.addEventListener('mousemove', this.onMousemove);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMousemove);
  }

  ref = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  };

  onResize = () => this.forceUpdate();

  onMousemove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;

    this.setState({
      cursor: [offsetX, offsetY],
    });
  };

  render = () => {
    const { children } = this.props;
    const { cursor } = this.state;

    return (
      <Fragment>
        <WindowSize getChildProps={sizeToStrPx} onResize={this.onResize}>
          <canvas ref={this.ref} />
        </WindowSize>

        {!!this.canvasContext &&
          cloneChildren(children)(() => ({
            canvasContext: this.canvasContext,
            cursor,
          }))}
      </Fragment>
    );
  };
}

export default Canvas;
