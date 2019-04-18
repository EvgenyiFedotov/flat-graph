import React, {
  Component, ReactElement, cloneElement, SyntheticEvent,
} from 'react';

interface Props {
  children: ReactElement;
  onMouseDown?: Function;
  onMouseUp?: Function;
  onClick?: Function;
  onMouseMove?: Function;
}

export type Offset = [number, number];

export interface StateMouseEvent {
  offset: Offset;
}

class MouseEvents extends Component<Props> {
  stateMouseDown: StateMouseEvent;

  stateMouseUp: StateMouseEvent;

  constructor(props: Props) {
    super(props);

    this.resetEvents();
  }

  resetEvents = () => {
    this.stateMouseDown = null;
    this.stateMouseUp = null;
  };

  onMouseDown = (e: SyntheticEvent) => {
    this.resetEvents();

    this.stateMouseDown = MouseEvents.buildStateMouseEvent(e);

    const { onMouseDown } = this.props;

    if (onMouseDown) {
      onMouseDown({ ...this.stateMouseDown });
    }
  };

  onMouseUp = (e: SyntheticEvent) => {
    this.stateMouseUp = MouseEvents.buildStateMouseEvent(e);

    const { onMouseUp } = this.props;

    if (onMouseUp) {
      onMouseUp({ ...this.stateMouseUp });
    }
  };

  onClick = (e: SyntheticEvent) => {
    const { onClick } = this.props;

    if (this.stateMouseDown && this.stateMouseUp && onClick) {
      const isClick = MouseEvents.isClick(this.stateMouseDown, this.stateMouseUp);

      if (isClick) {
        onClick(MouseEvents.buildStateMouseEvent(e));
      }
    }
  };

  onMouseMove = (e: SyntheticEvent) => {
    if (this.stateMouseDown !== null && this.stateMouseUp === null) {
      console.log(this.stateMouseDown);
    }
  };

  render = () => {
    const { children, ...otherProps } = this.props;

    return cloneElement(children, {
      ...otherProps,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onClick: this.onClick,
      onMouseMove: this.onMouseMove,
    });
  };

  static getOffsetEvent = (event: SyntheticEvent): Offset => {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;

    return [offsetX, offsetY];
  };

  static comparisonOffset = (offset1: Offset, offset2: Offset) => (indexValue: number): Boolean => offset1[indexValue] === offset2[indexValue];

  static isClick = (stateMouseDown: StateMouseEvent, stateMouseUp: StateMouseEvent) => {
    const comparisonOffset = MouseEvents.comparisonOffset(
      stateMouseDown.offset,
      stateMouseUp.offset,
    );

    return comparisonOffset(0) && comparisonOffset(1);
  };

  static buildStateMouseEvent = (event: SyntheticEvent): StateMouseEvent => ({
    offset: MouseEvents.getOffsetEvent(event),
  });
}

export default MouseEvents;
