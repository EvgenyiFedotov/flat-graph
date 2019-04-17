import React, { Component, Children, ReactElement, cloneElement, Fragment } from 'react';
import { getSize } from './windowSize/common';
import Resize from './windowSize/Resize';

interface Props {
  children?: ReactElement;
  getChildProps?: Function;
  onResize?: Function;
}

class WindowSize extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = getSize();
  }

  onResize = () => {
    const { onResize } = this.props;
    const size = getSize();

    this.setState(size);

    if (onResize) {
      onResize(size);
    }
  };

  render = () => {
    const { children, getChildProps } = this.props;

    return (
      <Fragment>
        <Resize>{this.onResize}</Resize>
        {Children.toArray(children).reduce((result: any[], element: ReactElement) => {
          const windowSize = { ...this.state };

          result.push(cloneElement(element, getChildProps ? getChildProps(windowSize) : null));

          return result;
        }, [])}
      </Fragment>
    );
  };
}

export default WindowSize;
