import { Component, ReactElement } from 'react';
import { cloneChildren } from './common';
import { StateMouseEvent } from './MouseEvents';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  children: any;
  stateEvent?: StateMouseEvent;
}

class Layers extends Component<Props> {
  layers: ReactElement[];

  constructor(props: Props) {
    super(props);

    this.layers = [];
  }

  componentDidMount() {
    // console.log(this.props.cursor);
  }

  componentDidUpdate() {
    // console.log(this.props.cursor);
  }

  refLayer = (index: number) => (layer: ReactElement) => (this.layers[index] = layer);

  render = () => {
    const { children, canvasContext, stateEvent } = this.props;

    return cloneChildren(children)((el: ReactElement, index: number) => ({
      ref: this.refLayer(index),
      canvasContext,
      stateEvent,
    }));
  };
}

export default Layers;
