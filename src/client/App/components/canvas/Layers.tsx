import { Component, ReactElement } from 'react';
import { cloneChildren } from './common';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  children: ReactElement | ReactElement[];
}

class Layers extends Component<Props> {
  layers: ReactElement[];

  constructor(props: Props) {
    super(props);

    this.layers = [];
  }

  componentDidMount() {
    console.log(this.layers);
  }

  componentDidUpdate() {
    console.log(this.layers);
  }

  refLayer = (index: number) => (layer: ReactElement) => (this.layers[index] = layer);

  render = () => {
    const { children, canvasContext } = this.props;

    return cloneChildren(children)((el: ReactElement, index: number) => ({
      canvasContext,
      ref: this.refLayer(index),
    }));
  };
}

export default Layers;
