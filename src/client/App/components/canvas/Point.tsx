import { Component } from 'react';
import { Position } from './common';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  position: Position;
  radius: number;
  color: string;
  angle: [number, number];
}

class Point extends Component<Props> {
  static defaultProps = {
    position: [0, 0],
    radius: 1,
    color: '#000000',
    angle: [0, 2 * Math.PI],
  };

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();

    console.log('@componentDidUpdate');
  }

  draw = () => {
    const {
      canvasContext, position, radius, color, angle,
    } = this.props;
    const [x, y] = position;
    const [start, end] = angle;

    canvasContext.beginPath();
    canvasContext.fillStyle = color;
    canvasContext.arc(x, y, radius, start, end);
    canvasContext.fill();
  };

  render = () => null;
}

export default Point;
