import { Position } from '../canvas/common';

export enum Value {
  enabled = 'enabled',
  active = 'active',
  disabled = 'disabled',
}

export enum Colors {
  enabled = 'darkorange',
  active = 'rebeccapurple',
  disabled = '#E0E0E0',
}

export enum Radius {
  enabled = 10,
  active = 15,
  disabled = 10,
}

export interface Config {
  position: Position;
  color: string;
  radius: number;
}

export interface Props {
  position: Position;
  value?: Value;
}

class Point {
  position: Position;

  value: Value = Value.enabled;

  constructor(position: Position, value: Value = Value.enabled) {
    const [x, y] = position;

    this.position = [x, y];
    this.value = value;
  }

  toggle() {
    if (this.value === Value.active) {
      this.value = Value.enabled;
    } else if (this.value === Value.enabled) {
      this.value = Value.active;
    }
  }

  getConfig(): Config {
    const [x, y] = this.position;

    return {
      position: [x, y],
      color: Point.getColor(this.value),
      radius: Point.getRadius(this.value),
    };
  }

  static getColor = (value?: Value): string => Colors[value];

  static getRadius = (value?: Value): number => Radius[value];
}

export default Point;
