'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var generateFile = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(schema, target) {
    var content;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = '';
            _context.t0 = target.type;
            _context.next = _context.t0 === 'schemaFlow' ? 4 : _context.t0 === 'schemaJSON' ? 8 : _context.t0 === 'schemaGQL' ? 12 : 16;
            break;

          case 4:
            _context.next = 6;
            return (0, _generateFlowTypes2.default)(schema);

          case 6:
            content = _context.sent;
            return _context.abrupt('break', 17);

          case 8:
            _context.next = 10;
            return (0, _generateSchemaJSON2.default)(schema);

          case 10:
            content = _context.sent;
            return _context.abrupt('break', 17);

          case 12:
            _context.next = 14;
            return (0, _generateSchemaGQL2.default)(schema);

          case 14:
            content = _context.sent;
            return _context.abrupt('break', 17);

          case 16:
            return _context.abrupt('break', 17);

          case 17:
            if (target.outputPath) {
              _fs2.default.writeFileSync(target.outputPath, content);
            }
            return _context.abrupt('return', content);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function generateFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _GQLConfig = require('../../config/GQLConfig');

var _GQLConfig2 = _interopRequireDefault(_GQLConfig);

var _schema = require('../../schema');

var _generateFlowTypes = require('./generateFlowTypes');

var _generateFlowTypes2 = _interopRequireDefault(_generateFlowTypes);

var _generateSchemaJSON = require('./generateSchemaJSON');

var _generateSchemaJSON2 = _interopRequireDefault(_generateSchemaJSON);

var _generateSchemaGQL = require('./generateSchemaGQL');

var _generateSchemaGQL2 = _interopRequireDefault(_generateSchemaGQL);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generate(params) {
  var _this = this;

  var config = new _GQLConfig2.default(params.configOptions);
  var schemaBuilder = new _schema.SchemaBuilder({
    config: config,
    watch: false,
    onInit: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                return _context3.delegateYield(_regenerator2.default.mark(function _callee2() {
                  var schema, targetContent;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          schema = schemaBuilder.getGraphQLSchema();
                          _context2.next = 3;
                          return _promise2.default.all(params.targets.map(function (target) {
                            return generateFile(schema, target);
                          }));

                        case 3:
                          targetContent = _context2.sent;

                          if (params.callback) {
                            params.callback(null, targetContent);
                          }

                        case 5:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                })(), 't0', 2);

              case 2:
                _context3.next = 7;
                break;

              case 4:
                _context3.prev = 4;
                _context3.t1 = _context3['catch'](0);

                if (params.callback) {
                  params.callback(_context3.t1, null);
                }

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this, [[0, 4]]);
      }));

      return function onInit() {
        return _ref2.apply(this, arguments);
      };
    }()
  });
}

exports.default = generate;