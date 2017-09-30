"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = _react.PropTypes.number;
var string = _react.PropTypes.string;
var array = _react.PropTypes.array;
var object = _react.PropTypes.object;
var func = _react.PropTypes.func;
var oneOfType = _react.PropTypes.oneOfType;


var Bar = _react2.default.createClass({
    displayName: "Bar",

    propTypes: {
        width: number.isRequired,
        height: number.isRequired,
        x: number.isRequired,
        y: number.isRequired,
        fill: string.isRequired,
        data: oneOfType([array, object]).isRequired,
        onMouseEnter: func,
        onMouseLeave: func
    },

    render: function render() {
        var _props = this.props;
        var x = _props.x;
        var y = _props.y;
        var width = _props.width;
        var height = _props.height;
        var fill = _props.fill;
        var data = _props.data;
        var onMouseEnter = _props.onMouseEnter;
        var _onMouseLeave = _props.onMouseLeave;


        return _react2.default.createElement("rect", {
            className: "bar",
            x: x,
            y: y,
            width: width,
            height: height,
            fill: fill,
            onMouseMove: function onMouseMove(e) {
                return onMouseEnter(e, data);
            },
            onMouseLeave: function onMouseLeave(e) {
                return _onMouseLeave(e);
            }
        });
    }
});

exports.default = Bar;