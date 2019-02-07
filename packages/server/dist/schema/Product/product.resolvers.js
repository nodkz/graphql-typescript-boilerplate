"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var products_json_1 = __importDefault(require("../__data__/products.json"));
var productsData = lodash_1.chain(products_json_1.default.map(function (o, i) {
    return __assign({ _id: "" + (i + 1) }, o);
}));
exports.productsData = productsData;
var resolvers = {
    Query: {
        product: function (_, args) {
            return productsData.find({ _id: args.id }).value() || null;
        },
        products: function (_, args) {
            return (productsData
                .filter(__assign({}, args.filter))
                .drop(args.offset || 0)
                .take(args.limit)
                .value() || []);
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=product.resolvers.js.map