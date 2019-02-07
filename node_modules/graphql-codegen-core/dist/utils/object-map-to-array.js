"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objectMapToArray(objectMap) {
    return Object.keys(objectMap).map(function (key) { return ({ key: key, value: objectMap[key] }); });
}
exports.objectMapToArray = objectMapToArray;
//# sourceMappingURL=object-map-to-array.js.map