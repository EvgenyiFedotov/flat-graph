import React, { Component, Fragment } from 'react';
import WindowSize from './WindowSize';
import { sizeToStrPx, getSize } from './windowSize/common';
import { cloneChildren } from './canvas/common';
import MouseEvents, { StateMouseEvent } from './canvas/MouseEvents';

interface Props {}

interface State {
  stateEvent?: StateMouseEvent;
}

class Canvas extends Component<Props, State> {
  canvas: HTMLCanvasElement;

  canvasContext: CanvasRenderingContext2D;

  constructor(props: Props) {
    super(props);

    this.state = {
      stateEvent: null,
    };
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentWillUpdate() {
    const { width, height } = getSize();

    this.canvasContext.clearRect(0, 0, width, height);
  }

  ref = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  };

  onResize = () => this.forceUpdate();

  eventCallback = (stateEvent: StateMouseEvent) => this.setState({ stateEvent });

  render = () => {
    const { children } = this.props;
    const { stateEvent } = this.state;

    return (
      <Fragment>
        <WindowSize getChildProps={sizeToStrPx} onResize={this.onResize}>
          <MouseEvents onClick={this.eventCallback}>
            <canvas ref={this.ref} />
          </MouseEvents>
        </WindowSize>

        {!!this.canvasContext &&
          cloneChildren(children)(() => ({
            canvasContext: this.canvasContext,
            stateEvent,
          }))}
      </Fragment>
    );
  };
}

export default Canvas;
