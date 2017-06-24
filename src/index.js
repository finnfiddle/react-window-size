// higher-order component that passes the dimensions of the window as props to
// the wrapped component
import React, { Component } from 'react';

export default (ComposedComponent) => class extends Component {

  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0,
    };
  }

  handleResize() {
    // set initial state
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  componentDidMount() {
    // bind window resize listeners
    this._handleResize = this.handleResize.bind(this);
    this._handleResize();
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    // clean up listeners
    window.removeEventListener('resize', this._handleResize);
  }

  render() {
    // pass window dimensions as props to wrapped component
    return (
      <ComposedComponent
        {...this.props}
        windowWidth={this.state.width}
        windowHeight={this.state.height}
      />
    );
  }

};
