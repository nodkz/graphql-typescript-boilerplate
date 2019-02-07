'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _nodeIpc = require('node-ipc');

var _nodeIpc2 = _interopRequireDefault(_nodeIpc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function () {
  function Server(config, methodsMap) {
    (0, _classCallCheck3.default)(this, Server);

    // setup config
    _nodeIpc2.default.config.id = config.serverName;
    _nodeIpc2.default.config.silent = !config.debug;
    _nodeIpc2.default.config.logInColor = true;

    // create socket
    _nodeIpc2.default.serve(function () {
      _nodeIpc2.default.log('server started');
    });

    _nodeIpc2.default.server.on('ping', function (input, socket) {
      _nodeIpc2.default.server.emit(socket, 'ping', { response: true });
    });

    _nodeIpc2.default.server.on('stop', function () {
      _nodeIpc2.default.server.stop();
    });

    // register rpc methods
    // TODO: somehow listen for events which are not registered
    (0, _forEach3.default)(methodsMap, function (methodFunc, methodName) {
      _nodeIpc2.default.log('register', methodName);
      _nodeIpc2.default.server.on(methodName, function (input, socket) {
        _nodeIpc2.default.log('server:', methodName, input);
        methodFunc(input, function (error, output) {
          // process input
          // emit event for client
          _nodeIpc2.default.server.emit(socket, methodName, { error: error, response: output });
        });
      });
    });
  }

  (0, _createClass3.default)(Server, [{
    key: 'start',
    value: function start() {
      // eslint-disable-line class-methods-use-this
      return new _promise2.default(function (resolve) {
        _nodeIpc2.default.server.start();
        _nodeIpc2.default.server.on('start', function () {
          resolve();
        });
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      // eslint-disable-line class-methods-use-this
      return new _promise2.default(function (resolve) {
        _nodeIpc2.default.server.stop();
        resolve();
      });
    }
  }]);
  return Server;
}();

exports.default = Server;