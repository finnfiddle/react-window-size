# React Window Size

A higher-order React component that passes the browser window's dimensions as props to the wrapped component.

Example:

```javascript
import React, { Component } from 'react';
import windowSize from 'react-window-size';

class ScreenSize extends Component {

  render() {
    return (
      <p>
        Screen's width is: {this.props.windowWidth}<br />
        Screen's height is: {this.props.windowHeight}
      </p>
    );
  }

}

export default windowSize(ScreenSize);
```
