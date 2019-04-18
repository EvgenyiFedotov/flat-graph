import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';
import Layers from './canvas/Layers';
import { Position } from './canvas/common';
import Line from './canvas/Line';

interface Props {
  children?: ReactElement;
}

interface PointConfig {
  position: Position;
  color: string;
  value: boolean;
  radius: number;
}

const getColor = (value: boolean = false) => (value ? 'rebeccapurple' : 'darkorange');

const getRadius = (value: boolean = false) => (value ? 15 : 10);

const createPointConfig = (position: Position = [0, 0]) => (
  value: boolean = false,
): PointConfig => ({
  radius: getRadius(value),
  color: getColor(value),
  value,
  position,
});

const defPoints: PointConfig[] = [
  createPointConfig([50, 50])(true),
  createPointConfig([100, 50])(),
  createPointConfig([150, 50])(true),
  createPointConfig([50, 100])(),
  createPointConfig([100, 100])(true),
  createPointConfig([150, 100])(),
  createPointConfig([50, 150])(true),
  createPointConfig([100, 150])(),
  createPointConfig([150, 150])(true),
];

type Points = [Position, Position];

interface LineConfig {
  points: Points;
  color: string;
}

const createLineConfig = (points: Points = [[0, 0], [0, 0]]): LineConfig => ({
  color: 'rebeccapurple',
  points,
});

const defLines: LineConfig[] = [
  createLineConfig([[50, 50], [100, 100]]),
  createLineConfig([[150, 50], [100, 100]]),
  createLineConfig([[50, 150], [100, 100]]),
  createLineConfig([[150, 150], [100, 100]]),
];

class FlatGraph extends Component<Props> {
  state = {
    points: defPoints,
    lines: defLines,
  };

  onClick = (index: number) => () => {
    const { points } = this.state;
    const newPoints = [...points];
    const point = points[index];

    newPoints[index] = createPointConfig(point.position)(!point.value);

    this.setState({ points: newPoints });
  };

  render = () => {
    const { lines, points } = this.state;

    return (
      <div className="flat-graph">
        <Canvas>
          <Layers>
            {lines.reduce(
              (res: any[], line, index) => [...res, <Line {...line} key={index} />],
              [],
            )}

            {points.reduce(
              (res: any[], point, index) => [
                ...res,
                <Point {...point} key={index} onClick={this.onClick(index)} />,
              ],
              [],
            )}
          </Layers>
        </Canvas>
      </div>
    );
  };
}

export default FlatGraph;
