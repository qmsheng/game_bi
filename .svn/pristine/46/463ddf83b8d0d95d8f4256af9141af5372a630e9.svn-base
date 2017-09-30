'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _DefaultPropsMixin = require('./DefaultPropsMixin');

var _DefaultPropsMixin2 = _interopRequireDefault(_DefaultPropsMixin);

var _HeightWidthMixin = require('./HeightWidthMixin');

var _HeightWidthMixin2 = _interopRequireDefault(_HeightWidthMixin);

var _ArrayifyMixin = require('./ArrayifyMixin');

var _ArrayifyMixin2 = _interopRequireDefault(_ArrayifyMixin);

var _StackAccessorMixin = require('./StackAccessorMixin');

var _StackAccessorMixin2 = _interopRequireDefault(_StackAccessorMixin);

var _StackDataMixin = require('./StackDataMixin');

var _StackDataMixin2 = _interopRequireDefault(_StackDataMixin);

var _DefaultScalesMixin = require('./DefaultScalesMixin');

var _DefaultScalesMixin2 = _interopRequireDefault(_DefaultScalesMixin);

var _TooltipMixin = require('./TooltipMixin');

var _TooltipMixin2 = _interopRequireDefault(_TooltipMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var array = _react.PropTypes.array;
var func = _react.PropTypes.func;


var DataSet = _react2.default.createClass({
    displayName: 'DataSet',

    propTypes: {
        data: array.isRequired,
        xScale: func.isRequired,
        yScale: func.isRequired,
        colorScale: func.isRequired,
        values: func.isRequired,
        label: func.isRequired,
        x: func.isRequired,
        y: func.isRequired,
        y0: func.isRequired
    },

    render: function render() {
        var _props = this.props;
        var data = _props.data;
        var xScale = _props.xScale;
        var yScale = _props.yScale;
        var colorScale = _props.colorScale;
        var values = _props.values;
        var label = _props.label;
        var x = _props.x;
        var y = _props.y;
        var y0 = _props.y0;
        var onMouseEnter = _props.onMouseEnter;
        var onMouseLeave = _props.onMouseLeave;
        var groupedBars = _props.groupedBars;
        var colorByLabel = _props.colorByLabel;


        var bars = void 0;
        if (groupedBars) {
            bars = data.map(function (stack, serieIndex) {
                return values(stack).map(function (e, index) {
                    return _react2.default.createElement(_Bar2.default, {
                        key: label(stack) + '.' + index,
                        width: xScale.rangeBand() / data.length,
                        height: yScale(yScale.domain()[0]) - yScale(y(e)),
                        x: xScale(x(e)) + xScale.rangeBand() * serieIndex / data.length,
                        y: yScale(y(e)),
                        fill: colorScale(label(stack)),
                        data: e,
                        onMouseEnter: onMouseEnter,
                        onMouseLeave: onMouseLeave
                    });
                });
            });
        } else {
            bars = data.map(function (stack) {
                return values(stack).map(function (e, index) {
                    var color = colorByLabel ? colorScale(label(stack)) : colorScale(x(e));
                    return _react2.default.createElement(_Bar2.default, {
                        key: label(stack) + '.' + index,
                        width: xScale.rangeBand(),
                        height: yScale(yScale.domain()[0]) - yScale(y(e)),
                        x: xScale(x(e)),
                        y: yScale(y0(e) + y(e)),
                        fill: color,
                        data: e,
                        onMouseEnter: onMouseEnter,
                        onMouseLeave: onMouseLeave
                    });
                });
            });
        }

        return _react2.default.createElement(
            'g',
            null,
            bars
        );
    }
});

var BarChart = _react2.default.createClass({
    displayName: 'BarChart',

    mixins: [_DefaultPropsMixin2.default, _HeightWidthMixin2.default, _ArrayifyMixin2.default, _StackAccessorMixin2.default, _StackDataMixin2.default, _DefaultScalesMixin2.default, _TooltipMixin2.default],

    getDefaultProps: function getDefaultProps() {
        return {
            colorByLabel: true
        };
    },
    _tooltipHtml: function _tooltipHtml(d) {
        var xScale = this._xScale;
        var yScale = this._yScale;

        var html = this.props.tooltipHtml(this.props.x(d), this.props.y0(d), this.props.y(d));

        var midPoint = xScale.rangeBand() / 2;
        var xPos = midPoint + xScale(this.props.x(d));

        var topStack = this._data[this._data.length - 1].values;
        var topElement = null;

        // TODO: this might not scale if dataset is huge.
        // consider pre-computing yPos for each X
        for (var i = 0; i < topStack.length; i++) {
            if (this.props.x(topStack[i]) === this.props.x(d)) {
                topElement = topStack[i];
                break;
            }
        }
        var yPos = yScale(this.props.y0(topElement) + this.props.y(topElement));

        return [html, xPos, yPos];
    },
    render: function render() {
        var _props2 = this.props;
        var xAxis = _props2.xAxis;
        var yAxis = _props2.yAxis;
        var _props3 = this.props;
        var height = _props3.height;
        var width = _props3.width;
        var margin = _props3.margin;
        var colorScale = _props3.colorScale;
        var values = _props3.values;
        var label = _props3.label;
        var y = _props3.y;
        var y0 = _props3.y0;
        var x = _props3.x;
        var groupedBars = _props3.groupedBars;
        var colorByLabel = _props3.colorByLabel;
        var tickFormat = _props3.tickFormat;


        var data = this._data;
        var innerWidth = this._innerWidth;
        var innerHeight = this._innerHeight;
        var xScale = this._xScale;
        var yScale = this._yScale;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _Chart2.default,
                { height: height, width: width, margin: margin },
                _react2.default.createElement(DataSet, {
                    data: data,
                    xScale: xScale,
                    yScale: yScale,
                    colorScale: colorScale,
                    values: values,
                    label: label,
                    y: y,
                    y0: y0,
                    x: x,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave,
                    groupedBars: groupedBars,
                    colorByLabel: colorByLabel
                }),
                _react2.default.createElement(_Axis2.default, _extends({
                    className: 'x axis',
                    orientation: 'bottom',
                    scale: xScale,
                    height: innerHeight,
                    width: innerWidth,
                    tickFormat: tickFormat
                }, xAxis)),
                _react2.default.createElement(_Axis2.default, _extends({
                    className: 'y axis',
                    orientation: 'left',
                    scale: yScale,
                    height: innerHeight,
                    width: innerWidth,
                    tickFormat: tickFormat
                }, yAxis)),
                this.props.children
            ),
            _react2.default.createElement(_Tooltip2.default, this.state.tooltip)
        );
    }
});

exports.default = BarChart;