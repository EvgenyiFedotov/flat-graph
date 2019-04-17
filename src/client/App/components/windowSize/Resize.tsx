import { Component } from 'react';

interface Props {
  children: Function;
}

class Resize extends Component<Props> {
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = (...args: Array<any>) => {
    const { children } = this.props;

    children(...args);
  };

  render = () => null;
}

export default Resize;
