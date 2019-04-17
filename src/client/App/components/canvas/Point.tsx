import { Component } from 'react';
import { Position, Cursor } from './common';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  position: Position;
  radius: number;
  color: string;
  angle: [number, number];
  cursor?: Cursor;
  onMousemove?: Function;
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

  componentDidUpdate(prevProps: Props) {
    if (this.isChangePropsDraw(prevProps)) {
      this.draw();
    }

    this.onMousemove(prevProps);
  }

  isChangePropsDraw(prevProps: Props): boolean {
    const {
      position, angle, radius, color,
    } = this.props;

    if (
      prevProps.position !== position
      || prevProps.angle !== angle
      || prevProps.radius !== radius
      || prevProps.color !== color
    ) {
      return true;
    }

    return false;
  }

  onMousemove = (prevProps: Props) => {
    const { cursor, onMousemove } = this.props;
    const isInside = Point.isInside(this.props)(cursor);

    if (prevProps.cursor !== cursor && isInside && onMousemove) {
      onMousemove(cursor);
    }
  };

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

  static isInside = (props: Props) => (cursor: Cursor) => {
    const { position } = props;
    let { radius } = props;
    const [x, y] = position;
    const distPoints = (cursor[0] - x) * (cursor[0] - x) + (cursor[1] - y) * (cursor[1] - y);

    radius *= radius;

    if (distPoints < radius) {
      return true;
    }

    return false;
  };
}

export default Point;
