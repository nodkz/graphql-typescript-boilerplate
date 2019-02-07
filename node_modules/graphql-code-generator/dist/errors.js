"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DetailedError = /** @class */ (function (_super) {
    __extends(DetailedError, _super);
    function DetailedError(message, details, source) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.details = details;
        _this.source = source;
        Object.setPrototypeOf(_this, DetailedError.prototype);
        Error.captureStackTrace(_this, DetailedError);
        return _this;
    }
    return DetailedError;
}(Error));
exports.DetailedError = DetailedError;
function isDetailedError(error) {
    return error.details;
}
exports.isDetailedError = isDetailedError;
//# sourceMappingURL=errors.js.map