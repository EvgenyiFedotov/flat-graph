import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  render = () => {
    return (
      <div className="flat-graph">
        <Canvas>
          <Point position={[100, 100]} color="orange" radius={20} />
          <Point />
          <Point />
          <Point />
          <Point />
        </Canvas>
      </div>
    );
  };
}

export default FlatGraph;
