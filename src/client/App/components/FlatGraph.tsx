import React, { Component, ReactElement } from 'react';
import Canvas from './Canvas';
import Point from './canvas/Point';
import Layers from './canvas/Layers';
import Line from './canvas/Line';
import PointConfig, { Value as PointValue } from './flatGraph/Point';
import LineConfig from './flatGraph/Line';
import Grid, { defMap } from './flatGraph/Grid';

type Points = PointConfig[];

const defPoints: Points = [
  new PointConfig([50, 50]),
  new PointConfig([100, 50], PointValue.disabled),
  new PointConfig([150, 50]),
  new PointConfig([50, 100]),
  new PointConfig([100, 100]),
  new PointConfig([150, 100]),
  new PointConfig([50, 150]),
  new PointConfig([100, 150], PointValue.disabled),
  new PointConfig([150, 150]),
];

type Lines = LineConfig[];

const defLines: Lines = [
  // new LineConfig([50, 50], [100, 100]),
  // new LineConfig([150, 50], [100, 100]),
  // new LineConfig([50, 150], [100, 100]),
  // new LineConfig([150, 150], [100, 100]),
];

interface Props {
  children?: ReactElement;
}

interface State {
  points: Points;
  lines: Lines;
  activePoint?: PointConfig;
}

class FlatGraph extends Component<Props, State> {
  state = {
    points: defPoints,
    lines: defLines,
    activePoint: null,
  };

  onClick = (index: number) => () => {
    const { points, activePoint } = this.state;
    const point = points[index];

    if (activePoint === null) {
      this.setState({
        activePoint: point,
      });

      point.toggle();
    } else {
      const { lines, activePoint } = this.state;

      activePoint.toggle();

      lines.push(new LineConfig(activePoint.position, point.position));

      this.setState({ lines, activePoint: null });
    }
  };

  render = () => {
    const { lines, points } = this.state;

    return (
      <div className="flat-graph">
        <Canvas>
          <Layers>
            {lines.reduce(
              (res: any[], line: LineConfig, index: number) => [
                ...res,
                <Line {...line.getConfig()} key={index} />,
              ],
              [],
            )}

            {points.reduce(
              (res: any[], point: PointConfig, index: number) => [
                ...res,
                <Point {...point.getConfig()} key={index} onClick={this.onClick(index)} />,
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
