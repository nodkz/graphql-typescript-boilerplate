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
var customers_json_1 = __importDefault(require("../__data__/customers.json"));
var customersData = lodash_1.chain(customers_json_1.default.map(function (o, i) {
    return __assign({ _id: "" + (i + 1) }, o);
}));
exports.customersData = customersData;
var resolvers = {
    Query: {
        customer: function (_, args) {
            return customersData.find({ _id: args.id }).value() || null;
        },
        customers: function (_, args) {
            return (customersData
                .filter(__assign({}, args.filter))
                .drop(args.offset || 0)
                .take(args.limit)
                .value() || []);
        },
    },
    Mutation: {
        customer: function () { return ({}); },
    },
    CustomerMutations: {
        create: function (_, _a) {
            var input = _a.input;
            var record = __assign({ _id: customersData.size().value() + 1 }, input);
            exports.customersData = customersData = lodash_1.chain(customersData.push(record).value());
            return {
                record: record,
            };
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=customer.resolvers.js.map