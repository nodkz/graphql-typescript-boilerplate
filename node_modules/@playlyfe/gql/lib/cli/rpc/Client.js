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

var _nodeIpc = require('node-ipc');

var _nodeIpc2 = _interopRequireDefault(_nodeIpc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = function () {
  function Client(config) {
    (0, _classCallCheck3.default)(this, Client);

    // set config
    _nodeIpc2.default.config.id = config.serverName;
    _nodeIpc2.default.config.stopRetrying = true;
    _nodeIpc2.default.config.silent = !config.debug;
  }

  (0, _createClass3.default)(Client, [{
    key: 'command',
    value: function command(method, input) {
      return new _promise2.default(function (resolve, reject) {
        var serverName = _nodeIpc2.default.config.id;

        _nodeIpc2.default.connectTo(serverName, function () {
          var server = _nodeIpc2.default.of[serverName];

          // connected and emit method
          server.on('connect', function () {
            _nodeIpc2.default.log('connected to "' + serverName + '"');
            // call method on server
            server.emit(method, input);
          });

          // listen for method response
          server.on(method, function (_ref) {
            var error = _ref.error,
                response = _ref.response;

            // receive server respons
            _nodeIpc2.default.disconnect(serverName); // disconnect client to server
            _nodeIpc2.default.log(serverName + '@' + method + ':response', error, response);
            resolve(response); // return response
          });

          server.on('error', function (err) {
            _nodeIpc2.default.log('client:error', err);
            reject(err);
          });

          server.on('disconnect', function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _nodeIpc2.default.log('disconnect', args);
          });
        });
      });
    }
  }]);
  return Client;
}();
/* eslint-disable class-methods-use-this */


exports.default = Client;