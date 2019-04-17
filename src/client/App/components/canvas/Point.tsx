import { Component } from 'react';
import { Position, Cursor } from './common';

interface Props {
  canvasContext?: CanvasRenderingContext2D;
  position: Position;
  radius: number;
  color: string;
  angle: [number, number];
  event?: MouseEvent;
  onClick?: Function;
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
    this.draw();

    this.changeEvent(prevProps);
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

  changeEvent(prevProps: Props) {
    const { event } = this.props;

    if (prevProps.event !== event) {
      const { offsetX, offsetY } = event;
      const isInside = Point.isInside(this.props)([offsetX, offsetY]);

      if (isInside) {
        const { type } = event;

        switch (type) {
          case 'click':
            this.onClick(event);
            break;
          default:
            break;
        }
      }
    }
  }

  onClick = (event: MouseEvent) => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(this, event);
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
