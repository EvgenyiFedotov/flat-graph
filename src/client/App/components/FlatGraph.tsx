import React, { Component, ReactElement } from 'react';
import WindowSize from './WindowSize';
import { sizeToStrPx } from './windowSize/common';

interface Props {
  children?: ReactElement;
}

class FlatGraph extends Component<Props> {
  render = () => {
    return (
      <div className="flat-graph">
        <WindowSize getChildProps={sizeToStrPx}>
          <canvas />
        </WindowSize>
      </div>
    );
  };
}

export default FlatGraph;
