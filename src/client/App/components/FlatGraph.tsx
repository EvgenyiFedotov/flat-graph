import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';
import Layers from './canvas/Layers';
import { Position } from './canvas/common';

interface Props {
  children?: ReactElement;
}

const points: Position[] = [
  [50, 50],
  [100, 50],
  [150, 50],
  [50, 100],
  [100, 100],
  [150, 100],
  [50, 150],
  [100, 150],
  [150, 150],
];

class FlatGraph extends Component<Props> {
  onMousemove = (index: number) => () => {
    console.log(index);
  };

  render = () => {
    return (
      <div className="flat-graph">
        <Canvas>
          <Layers>
            {points.reduce(
              (res: any[], position, index) => [
                ...res,
                <Point
                  color="orange"
                  key={index}
                  onMousemove={this.onMousemove(index)}
                  radius={10}
                  position={position}
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
