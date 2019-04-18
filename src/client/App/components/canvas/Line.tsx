import { Component } from 'react';
import { Point } from './common';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  points: [Point, Point];
  color: string;
  lineWidth: number;
  lineCap: string;
  lineJoin: string;
}

class Line extends Component<Props> {
  static defaultProps = {
    color: '#000000',
    lineWidth: 2,
    lineCap: 'butt',
    lineJoin: 'round',
  };

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  styled() {
    const {
      canvasContext, color, lineWidth, lineCap, lineJoin,
    } = this.props;

    canvasContext.lineWidth = lineWidth;
    canvasContext.lineCap = lineCap;
    canvasContext.lineJoin = lineJoin;
    canvasContext.strokeStyle = color;
  }

  draw() {
    const { canvasContext, points } = this.props;
    const [from, to] = points;

    this.styled();

    canvasContext.beginPath();
    canvasContext.moveTo(...from);
    canvasContext.lineTo(...to);
    canvasContext.stroke();
  }

  render = () => null;
}

export default Line;
