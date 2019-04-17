import React, { Component, Fragment } from 'react';
import WindowSize from './WindowSize';
import { sizeToStrPx } from './windowSize/common';
import { cloneChildren } from './canvas/common';

interface Props {}

interface State {
  event?: MouseEvent;
}

class Canvas extends Component<Props, State> {
  canvas: HTMLCanvasElement;

  canvasContext: CanvasRenderingContext2D;

  constructor(props: Props) {
    super(props);

    this.state = {
      event: null,
    };
  }

  componentDidMount() {
    this.forceUpdate();

    this.canvas.addEventListener('click', this.eventCallback);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('click', this.eventCallback);
  }

  ref = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
  };

  onResize = () => this.forceUpdate();

  eventCallback = (event: MouseEvent) => this.setState({ event });

  render = () => {
    const { children } = this.props;
    const { event } = this.state;

    return (
      <Fragment>
        <WindowSize getChildProps={sizeToStrPx} onResize={this.onResize}>
          <canvas ref={this.ref} />
        </WindowSize>

        {!!this.canvasContext &&
          cloneChildren(children)(() => ({
            canvasContext: this.canvasContext,
            event,
          }))}
      </Fragment>
    );
  };
}

export default Canvas;
