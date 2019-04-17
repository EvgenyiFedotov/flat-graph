import React, {
  Component, ReactElement, cloneElement, SyntheticEvent,
} from 'react';

interface Props {
  children: ReactElement;
}

class MouseEvents extends Component<Props> {
  mouseDown: SyntheticEvent;

  mouseUp: SyntheticEvent;

  constructor(props: Props) {
    super(props);

    this.resetEvents();
  }

  resetEvents = () => {
    this.mouseDown = null;
    this.mouseUp = null;
  };

  onMouseDown = (e: SyntheticEvent) => {
    this.resetEvents();

    this.mouseDown = e;
  };

  onMouseUp = (e: SyntheticEvent) => {
    this.mouseUp = e;
  };

  onClick = (e: SyntheticEvent) => {
    console.log(this.mouseDown, this.mouseUp, e.target);
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
}

export default MouseEvents;
