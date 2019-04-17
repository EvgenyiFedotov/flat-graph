import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';
import Layers from './canvas/Layers';
import { Position } from './canvas/common';

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

const getRadius = (value: boolean = false) => (value ? 20 : 10);

const defPoints: PointConfig[] = [
  {
    position: [50, 50],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [100, 50],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [150, 50],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [50, 100],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [100, 100],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [150, 100],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [50, 150],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [100, 150],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
  {
    position: [150, 150],
    color: getColor(),
    value: false,
    radius: getRadius(),
  },
];

class FlatGraph extends Component<Props> {
  state = {
    points: defPoints,
  };

  onClick = (index: number) => () => {
    const { points } = this.state;
    const point = { ...points[index] };
    const newPoints = [...points];

    point.value = !point.value;
    point.color = getColor(point.value);
    point.radius = getRadius(point.value);

    newPoints[index] = point;

    this.setState({ points: newPoints });
  };

  render = () => {
    const { points } = this.state;

    return (
      <div className="flat-graph">
        <Canvas>
          <Layers>
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
