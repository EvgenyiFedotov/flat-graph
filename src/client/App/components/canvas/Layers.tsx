import { Component, ReactElement } from 'react';
import { cloneChildren, Cursor } from './common';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  children: ReactElement | ReactElement[];
  cursor?: Cursor;
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
    const { children, canvasContext, cursor } = this.props;

    return cloneChildren(children)((el: ReactElement, index: number) => ({
      ref: this.refLayer(index),
      canvasContext,
      cursor,
    }));
  };
}

export default Layers;
