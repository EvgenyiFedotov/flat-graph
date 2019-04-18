import React, {
  Component, ReactElement, cloneElement, SyntheticEvent,
} from 'react';

interface Props {
  children: ReactElement;
  onMouseDown?: Function;
  onMouseUp?: Function;
  onClick?: Function;
}

export type Offset = [number, number];

export interface StateMouseEvent {
  offset: Offset;
}

class MouseEvents extends Component<Props> {
  mouseDownOffset: Offset;

  mouseUpOffset: Offset;

  constructor(props: Props) {
    super(props);

    this.resetEvents();
  }

  resetEvents = () => {
    this.mouseDownOffset = null;
    this.mouseUpOffset = null;
  };

  onMouseDown = (e: SyntheticEvent) => {
    this.resetEvents();

    this.mouseDownOffset = MouseEvents.getOffsetEvent(e);

    const { onMouseDown } = this.props;

    if (onMouseDown) {
      onMouseDown(MouseEvents.buildStateMouseEvent(e));
    }
  };

  onMouseUp = (e: SyntheticEvent) => {
    this.mouseUpOffset = MouseEvents.getOffsetEvent(e);

    const { onMouseUp } = this.props;

    if (onMouseUp) {
      onMouseUp(MouseEvents.buildStateMouseEvent(e));
    }
  };

  onClick = (e: SyntheticEvent) => {
    const { onClick } = this.props;

    if (this.mouseDownOffset && this.mouseUpOffset && onClick) {
      const isClick = MouseEvents.isClick(this.mouseDownOffset, this.mouseUpOffset);

      if (isClick) {
        onClick(MouseEvents.buildStateMouseEvent(e));
      }
    }
  };

  render = () => {
    const { children, ...otherProps } = this.props;

    return cloneElement(children, {
      ...otherProps,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onClick: this.onClick,
    });
  };

  static getOffsetEvent = (event: SyntheticEvent): Offset => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    return [offsetX, offsetY];
  };

  static comparisonOffset = (offset1: Offset, offset2: Offset) => (indexValue: number): Boolean => offset1[indexValue] === offset2[indexValue];

  static isClick = (mouseDownOffset: Offset, mouseUpOffset: Offset) => {
    const comparisonOffset = MouseEvents.comparisonOffset(mouseDownOffset, mouseUpOffset);

    return comparisonOffset(0) && comparisonOffset(1);
  };

  static buildStateMouseEvent = (event: SyntheticEvent): StateMouseEvent => ({
    offset: MouseEvents.getOffsetEvent(event),
  });
}

export default MouseEvents;
