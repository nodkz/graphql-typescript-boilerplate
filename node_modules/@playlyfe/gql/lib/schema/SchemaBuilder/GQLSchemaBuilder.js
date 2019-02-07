'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _source = require('graphql/language/source');

var _parser = require('graphql/language/parser');

var _type = require('graphql/type');

var _buildASTSchema2 = require('./buildASTSchema');

var _utilities = require('graphql/utilities');

var _GQLError = require('../../shared/GQLError');

var _schema = require('../../schema');

var _GQLConfig = require('../../config/GQLConfig');

var _GQLConfig2 = _interopRequireDefault(_GQLConfig);

var _watch = require('../../shared/watch');

var _watch2 = _interopRequireDefault(_watch);

require('../../shared/types');

require('../../shared/GQLTypes');

require('graphql/language/ast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GQLSchemaBuilder = function () {
  function GQLSchemaBuilder(options) {
    var _this = this;

    (0, _classCallCheck3.default)(this, GQLSchemaBuilder);
    this._parsedFilesMap = new _map2.default();
    this._isInitialized = false;

    this._parseFile = function (absPath) {
      var content = _fs2.default.readFileSync(absPath, 'utf8');
      var source = new _source.Source(content, absPath);
      try {
        var ast = (0, _parser.parse)(source);
        return {
          ast: ast,
          error: null
        };
      } catch (err) {
        return {
          error: (0, _GQLError.toGQLError)(err, _GQLError.SEVERITY.error),
          ast: null
        };
      }
    };

    this._buildASTFromParsedFiles = function (parsedFiles) {
      var mergedDefinitions = [];
      var errors = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(parsedFiles.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parsedFile = _step.value;

          // eslint-disable-line no-restricted-syntax
          var ast = parsedFile.ast,
              error = parsedFile.error;

          if (error) {
            errors.push(error);
          } else {
            var definitions = ast.definitions;

            mergedDefinitions.push.apply(mergedDefinitions, (0, _toConsumableArray3.default)(definitions));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return {
        errors: errors, // parsed errors
        ast: {
          kind: 'Document',
          definitions: mergedDefinitions
        }
      };
    };

    var config = options.config,
        _onChange = options.onChange,
        onInit = options.onInit;


    this._config = config;

    // watch schema files and rebuild schema
    // console.log(config.getDir());
    var watchClient = (0, _watch2.default)({
      rootPath: config.getDir(),
      files: config.getSchema().files,
      name: 'gqlSchemaFiles',
      onChange: function onChange(files) {
        _this._updateFiles(files, config.getSchema());
        // console.log('init done');
        if (!_this._isInitialized) {
          _this._isInitialized = true;
          // console.log(this._isInitialized);
          if (onInit) {
            onInit();
          }
        }

        if (_onChange) {
          _onChange();
        }
        if (!options.watch) {
          watchClient.end();
        }
      }
    });
  }

  (0, _createClass3.default)(GQLSchemaBuilder, [{
    key: 'getSchema',
    value: function getSchema() {
      return this._schema;
    }
  }, {
    key: 'getGraphQLSchema',
    value: function getGraphQLSchema() {
      return (0, _utilities.buildASTSchema)(this._ast);
    }
  }, {
    key: 'getSchemaErrors',
    value: function getSchemaErrors() {
      return this._errors;
    }

    // private methods

  }, {
    key: '_updateFiles',
    value: function _updateFiles(files, config) {
      var _this2 = this;

      if (files.length === 0) {
        return;
      }

      // console.time('updating files');
      files.forEach(function (_ref) {
        var name = _ref.name,
            exists = _ref.exists;

        // console.log(name, exists);
        var absPath = _path2.default.join(_this2._config.getDir(), name);
        if (exists) {
          _this2._parsedFilesMap.set(absPath, _this2._parseFile(absPath));
        } else {
          _this2._parsedFilesMap.delete(absPath);
        }
      });
      // console.timeEnd('updating files');

      //  build merged ast
      // console.time('buildAST');

      var _buildASTFromParsedFi = this._buildASTFromParsedFiles(this._parsedFilesMap),
          ast = _buildASTFromParsedFi.ast,
          parseErrors = _buildASTFromParsedFi.errors;
      // console.timeEnd('buildAST');

      // build GQLSchema from ast
      // console.time('buildASTSchema');


      var _buildASTSchema = (0, _buildASTSchema2.buildASTSchema)(ast),
          schema = _buildASTSchema.schema,
          buildErrors = _buildASTSchema.errors;
      // console.timeEnd('buildASTSchema');

      // validate
      // console.time('validate');
      // console.log(config.validate);


      var validationErrors = (0, _schema.validate)(schema, ast, config.validate);
      // console.timeEnd('validate');

      this._ast = ast;
      this._schema = schema;
      this._errors = [].concat((0, _toConsumableArray3.default)(parseErrors), (0, _toConsumableArray3.default)(buildErrors), (0, _toConsumableArray3.default)(validationErrors));
    }
  }]);
  return GQLSchemaBuilder;
}();

exports.default = GQLSchemaBuilder;