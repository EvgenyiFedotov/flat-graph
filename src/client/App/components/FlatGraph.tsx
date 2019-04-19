import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';
import Layers from './canvas/Layers';
import { Position } from './canvas/common';
import Line from './canvas/Line';

enum PointValue {
  enabled = 'enabled',
  active = 'active',
  disabled = 'disabled',
}

interface PointConfig {
  position: Position;
  color: string;
  radius: number;
  value: string;
  clone: Function;
}

const getColor = (value?: PointValue): string => {
  switch (value) {
    case PointValue.active:
      return 'rebeccapurple';
    case PointValue.disabled:
      return '#E0E0E0';
    default:
      return 'darkorange';
  }
};

const getRadius = (value?: PointValue): number => {
  switch (value) {
    case PointValue.active:
      return 15;
    default:
      return 10;
  }
};

const createPointConfig = (position: Position = [0, 0]) => (
  value: PointValue = PointValue.enabled,
): PointConfig => ({
  clone: createPointConfig(position),
  radius: getRadius(value),
  color: getColor(value),
  value,
  position,
});

const togglePointValue = (point: PointConfig) => {
  const { value } = point;

  if (value === PointValue.active) {
    const { clone } = point;

    return clone(PointValue.enabled);
  } else if (value === PointValue.enabled) {
    const { clone } = point;

    return clone(PointValue.active);
  }

  return point;
};

const defPoints: PointConfig[] = [
  createPointConfig([50, 50])(PointValue.active),
  createPointConfig([100, 50])(PointValue.disabled),
  createPointConfig([150, 50])(PointValue.active),
  createPointConfig([50, 100])(PointValue.disabled),
  createPointConfig([100, 100])(PointValue.active),
  createPointConfig([150, 100])(PointValue.disabled),
  createPointConfig([50, 150])(PointValue.active),
  createPointConfig([100, 150])(PointValue.disabled),
  createPointConfig([150, 150])(PointValue.active),
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

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  state = {
    points: defPoints,
    lines: defLines,
  };

  onClick = (index: number) => () => {
    const { points } = this.state;
    const newPoints = [...points];
    const point = points[index];

    newPoints[index] = togglePointValue(point);

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
