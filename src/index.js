// higher-order component that passes the dimensions of the window as props to
// the wrapped component
import React, { Component } from 'react';

export default (ComposedComponent) => {

  class windowSize extends Component {

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

    getWrappedInstance() {
      return this.wrappedInstance;
    }

    render() {
      // pass window dimensions as props to wrapped component
      return (
        <ComposedComponent
          {...this.props}
          ref={c => { this.wrappedInstance = c; }}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      );
    }

  }

  const composedComponentName = ComposedComponent.displayName
    || ComposedComponent.name
    || 'Component';

  windowSize.displayName = `windowSize(${composedComponentName})`;
  return windowSize;

};
