'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.toMatchExpression = toMatchExpression;
exports.default = watch;

var _fbWatchman = require('fb-watchman');

var _fbWatchman2 = _interopRequireDefault(_fbWatchman);

require('./types');

require('../config/GQLConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globToMatchExpr = function globToMatchExpr(glob) {
  if (typeof glob === 'string') {
    return ['match', glob, 'wholename'];
  }

  if (glob.length === 1) {
    return ['match', glob[0], 'wholename'];
  }

  // array
  return ['anyof'].concat((0, _toConsumableArray3.default)(glob.map(function (g) {
    return ['match', g, 'wholename'];
  })));
};
function toMatchExpression(match) {
  // GlobPattern | Array<GlobPattern>
  if (typeof match === 'string' || Array.isArray(match)) {
    return globToMatchExpr(match);
  }

  // object form { match, exclude }
  var matchExpr = globToMatchExpr(match.include);
  var ignoreMatchExpr = match.ignore ? globToMatchExpr(match.ignore) : null;

  if (ignoreMatchExpr) {
    return ['allof', matchExpr, ['not', ignoreMatchExpr]];
  }

  return matchExpr;
}

function watch(options) {
  var rootPath = options.rootPath,
      name = options.name,
      files = options.files,
      onChange = options.onChange;
  // console.log(`Launching watch server for ${rootPath}`);

  var client = new _fbWatchman2.default.Client();
  client.capabilityCheck({ optional: [], required: ['relative_root'] }, function (error) {
    if (error) {
      console.error(error);
      client.end();
      return;
    }

    client.command(['watch-project', rootPath], function (err, _ref) {
      var _watch = _ref.watch,
          relativePath = _ref.relative_path,
          warning = _ref.warning;

      if (err) {
        console.error('Error initiating watch:', err);
        return;
      }

      if (warning) {
        console.log('warning: ', warning);
      }

      var sub = {
        expression: toMatchExpression(files),
        fields: ['name', 'exists', 'type'],
        relative_root: relativePath };

      // console.log(`Watch established on ${_watch} ${files}`);

      var gqlFilesWatchSubscription = name;
      client.command(['subscribe', _watch, gqlFilesWatchSubscription, sub], function (subscribeError, resp) {
        if (subscribeError) {
          console.error('failed to subscribe: ', subscribeError);
          return;
        }

        // $FlowDisableNextLine
        console.log('[Watch established (' + resp.subscribe + ')] \n\tbasePath: ' + _watch + ' \n\tRelativePath: ' + relativePath + ' \n\tFiles: ' + (0, _stringify2.default)(files, 2, 2));
      });

      client.on('subscription', function (resp) {
        if (resp.subscription !== gqlFilesWatchSubscription) {
          return;
        }
        onChange(resp.files);
      });
    });
  });
  return client;
}