'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = _react.PropTypes.string;
var array = _react.PropTypes.array;


var Path = _react2.default.createClass({
    displayName: 'Path',

    propTypes: {
        className: string,
        stroke: string.isRequired,
        strokeLinecap: string,
        strokeWidth: string,
        strokeDasharray: string,
        fill: string,
        d: string.isRequired,
        data: array.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: 'path',
            fill: 'none',
            strokeWidth: '2',
            strokeLinecap: 'butt',
            strokeDasharray: 'none'
        };
    },
    render: function render() {
        var _props = this.props;
        var className = _props.className;
        var stroke = _props.stroke;
        var strokeWidth = _props.strokeWidth;
        var strokeLinecap = _props.strokeLinecap;
        var strokeDasharray = _props.strokeDasharray;
        var fill = _props.fill;
        var d = _props.d;
        var style = _props.style;
        var data = _props.data;
        var onMouseEnter = _props.onMouseEnter;
        var _onMouseLeave = _props.onMouseLeave;


        return _react2.default.createElement('path', {
            className: className,
            stroke: stroke,
            strokeWidth: strokeWidth,
            strokeLinecap: strokeLinecap,
            strokeDasharray: strokeDasharray,
            fill: fill,
            d: d,
            onMouseMove: function onMouseMove(evt) {
                return onMouseEnter(evt, data);
            },
            onMouseLeave: function onMouseLeave(evt) {
                return _onMouseLeave(evt);
            },
            style: style
        });
    }
});

exports.default = Path;