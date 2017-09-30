"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = _react.PropTypes.number;
var shape = _react.PropTypes.shape;


var Chart = _react2.default.createClass({
    displayName: "Chart",

    propTypes: {
        height: number.isRequired,
        width: number.isRequired,
        margin: shape({
            top: number,
            bottom: number,
            left: number,
            right: number
        }).isRequired
    },

    render: function render() {
        var _props = this.props;
        var width = _props.width;
        var height = _props.height;
        var margin = _props.margin;
        var viewBox = _props.viewBox;
        var preserveAspectRatio = _props.preserveAspectRatio;
        var children = _props.children;


        return _react2.default.createElement(
            "svg",
            { ref: "svg", width: width, height: height, viewBox: viewBox, preserveAspectRatio: preserveAspectRatio },
            _react2.default.createElement(
                "g",
                { transform: "translate(" + margin.left + ", " + margin.top + ")" },
                children
            )
        );
    }
});

exports.default = Chart;