'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = generate;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _errors = require('./errors');

var _loading = require('./loading');

var _validation = require('./validation');

var _compilation = require('./compilation');

var _serializeToJSON = require('./serializeToJSON');

var _serializeToJSON2 = _interopRequireDefault(_serializeToJSON);

var _swift = require('./swift');

var _typescript = require('./typescript');

var _flow = require('./flow');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generate(inputPaths, schemaPath, outputPath, target, options) {
  var schema = (0, _loading.loadSchema)(schemaPath);

  var document = (0, _loading.loadAndMergeQueryDocuments)(inputPaths);

  (0, _validation.validateQueryDocument)(schema, document);

  var context = (0, _compilation.compileToIR)(schema, document);
  (0, _assign2.default)(context, options);

  var output = void 0;
  switch (target) {
    case 'json':
      output = (0, _serializeToJSON2.default)(context);
      break;
    case 'ts':
    case 'typescript':
      output = (0, _typescript.generateSource)(context);
      break;
    case 'flow':
      output = (0, _flow.generateSource)(context);
      break;
    case 'swift':
    default:
      output = (0, _swift.generateSource)(context);
      break;
  }

  if (outputPath) {
    _fs2.default.writeFileSync(outputPath, output);
  } else {
    console.log(output);
  }
}
//# sourceMappingURL=generate.js.map