// higher-order component that passes the dimensions of the window as props to
// the wrapped component
import React from 'react';
import PropTypes from 'prop-types';

function windowSize(Component) {
  class WindowSize extends React.Component {
    constructor() {
      super();
      this.state = {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    }

    handleResize() {
      // set initial state
      this.setState({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
    }

    componentDidMount() {
      // bind window resize listeners
      this._handleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this._handleResize);
      setTimeout(this._handleResize, 1000);
    }

    componentWillUnmount() {
      // clean up listeners
      window.removeEventListener('resize', this._handleResize);
    }

    render() {
      const { forwardRef, ...rest } = this.props;

      // pass window dimensions as props to wrapped component
      return (
        <Component
          {...rest}
          ref={forwardRef}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      );
    }
  }

  WindowSize.propTypes = {
    forwardRef: PropTypes.element,
  };

  function forwardRef(props, ref) {
    return <WindowSize {...props} forwardRef={ref} />;
  }

  const name = Component.displayName || Component.name || 'Component';
  forwardRef.displayName = `windowSize(${name})`;

  return React.forwardRef(forwardRef);
}

windowSize.propTypes = {
  Component: PropTypes.element,
};

export default windowSize;
