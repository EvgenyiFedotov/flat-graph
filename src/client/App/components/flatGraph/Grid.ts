import Point, { Value as PointValue } from './Point';
import Line from './Line';

export const defMap = [
  [
    50,
    [50, { point: PointValue.enabled }],
    [100, { point: PointValue.enabled }],
    [150, { point: PointValue.enabled }],
  ],
  [
    100,
    [50, { point: PointValue.enabled }],
    [100, { point: PointValue.enabled }],
    [150, { point: PointValue.enabled }],
  ],
  [
    150,
    [50, { point: PointValue.enabled }],
    [100, { point: PointValue.enabled }],
    [150, { point: PointValue.enabled }],
  ],
];

class Grid {
  map = defMap;

  static getPoints = (map): Point[] => map.reduce(
    (res, [x, ...row]) => [
      ...res,
      ...row.reduce((resRow, [y, element]) => [...resRow, new Point([x, y], element.point)], []),
    ],
    [],
  );

  static getLines = (map): Line[] => [];
}

export default Grid;
