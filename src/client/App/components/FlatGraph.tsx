import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';
import Layers from './canvas/Layers';

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  render = () => {
    return (
      <div className="flat-graph">
        <Canvas>
          <Layers>
            <Point position={[100, 100]} color="orange" radius={20} />
            <Point />
            <Point />
            <Point />
            <Point />
          </Layers>
        </Canvas>
      </div>
    );
  };
}

export default FlatGraph;
