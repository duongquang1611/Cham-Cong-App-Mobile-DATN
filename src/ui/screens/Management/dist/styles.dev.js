"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _commons = _interopRequireDefault(require("../../commons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = _reactNative.StyleSheet.create({
  containerInput: {
    marginBottom: _commons["default"].margin10
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
    fontSize: _commons["default"].fontSize12
  },
  textInput: {
    fontSize: _commons["default"].fontSize14,
    color: 'black'
  }
});

var _default = styles;
exports["default"] = _default;