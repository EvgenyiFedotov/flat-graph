import { Position } from '../canvas/common';

export type Points = [Position, Position];

export interface Config {
  points: Points;
  color: string;
}

class Line {
  points: Points;

  constructor(from: Position, to: Position) {
    this.points = [from, to];
  }

  getConfig(): Config {
    return {
      points: this.points,
      color: 'rebeccapurple',
    };
  }
}

export default Line;
