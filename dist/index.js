(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.index = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  exports.default = function (ComposedComponent) {
    var windowSize = function (_Component) {
      _inherits(windowSize, _Component);

      function windowSize() {
        _classCallCheck(this, windowSize);

        var _this = _possibleConstructorReturn(this, (windowSize.__proto__ || Object.getPrototypeOf(windowSize)).call(this));

        _this.state = {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
        return _this;
      }

      _createClass(windowSize, [{
        key: 'handleResize',
        value: function handleResize() {
          // set initial state
          this.setState({
            width: document.body.clientWidth,
            height: document.body.clientHeight
          });
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          // bind window resize listeners
          this._handleResize = this.handleResize.bind(this);
          window.addEventListener('resize', this._handleResize);
          setTimeout(this._handleResize, 1000);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          // clean up listeners
          window.removeEventListener('resize', this._handleResize);
        }
      }, {
        key: 'getWrappedInstance',
        value: function getWrappedInstance() {
          return this.wrappedInstance;
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          // pass window dimensions as props to wrapped component
          return _react2.default.createElement(ComposedComponent, _extends({}, this.props, {
            ref: function ref(c) {
              _this2.wrappedInstance = c;
            },
            windowWidth: this.state.width,
            windowHeight: this.state.height
          }));
        }
      }]);

      return windowSize;
    }(_react.Component);

    var composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

    windowSize.displayName = 'windowSize(' + composedComponentName + ')';
    return windowSize;
  };
});