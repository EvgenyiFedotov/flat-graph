import React, { Component } from 'react';

interface Props {
  onResize: Function;
}

class ResizeWindow extends Component<Props> {
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (...args) => {
    const { onResize } = this.props;

    onResize(args);
  };

  render = () => null;
}

export default ResizeWindow;
