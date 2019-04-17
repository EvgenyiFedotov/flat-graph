import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  render = () => {
    return (
      <div className="flat-graph">
        <Canvas />
      </div>
    );
  };
}

export default FlatGraph;
