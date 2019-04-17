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
}

const points: PointConfig[] = [
  {
    position: [50, 50],
  },
  {
    position: [100, 50],
  },
  {
    position: [150, 50],
  },
  {
    position: [50, 100],
  },
  {
    position: [100, 100],
  },
  {
    position: [150, 100],
  },
  {
    position: [50, 150],
  },
  {
    position: [100, 150],
  },
  {
    position: [150, 150],
  },
];

class FlatGraph extends Component<Props> {
  onClick = (index: number) => () => {
    console.log(index);
  };

  render = () => {
    return (
      <div className="flat-graph">
        <Canvas>
          <Layers>
            {points.reduce(
              (res: any[], point, index) => [
                ...res,
                <Point
                  color="orange"
                  key={index}
                  radius={10}
                  position={point.position}
                  onClick={this.onClick(index)}
                />,
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
