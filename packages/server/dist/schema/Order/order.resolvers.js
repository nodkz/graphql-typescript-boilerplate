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
var orders_json_1 = __importDefault(require("../__data__/orders.json"));
var customer_resolvers_1 = require("../Customer/customer.resolvers");
var employee_resolvers_1 = require("../Employee/employee.resolvers");
var product_resolvers_1 = require("../Product/product.resolvers");
var helpers_1 = require("../helpers");
var ordersData = lodash_1.chain(orders_json_1.default.map(function (o, i) {
    return __assign({ _id: "" + (i + 1) }, o);
}));
var resolvers = {
    Query: {
        order: function (_, args) {
            return ordersData.find({ _id: args.id }).value() || null;
        },
        orders: function (_, args) {
            return (ordersData
                .filter(__assign({}, args.filter))
                .drop(args.offset || 0)
                .take(args.limit)
                .value() || []);
        },
        orderPagination: function (_, _a) {
            var filter = _a.filter, page = _a.page, perPage = _a.perPage;
            var filteredItems = ordersData.filter(__assign({}, filter)).value() || [];
            var totalItems = filteredItems.length;
            var items = lodash_1.chain(filteredItems)
                .drop((page - 1) * perPage)
                .take(perPage)
                .value() || [];
            return {
                items: items,
                pageInfo: helpers_1.preparePageInfo(page, perPage, totalItems),
            };
        },
    },
    Order: {
        customer: function (_a) {
            var customerID = _a.customerID;
            if (!customerID) {
                return null;
            }
            return customer_resolvers_1.customersData.find({ customerID: customerID }).value();
        },
        employee: function (_a) {
            var employeeID = _a.employeeID;
            if (!employeeID) {
                return null;
            }
            return employee_resolvers_1.employeesData.find({ employeeID: employeeID }).value();
        },
    },
    OrderDetails: {
        product: function (_a) {
            var productID = _a.productID;
            if (!productID) {
                return null;
            }
            return product_resolvers_1.productsData.find({ productID: productID }).value();
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=order.resolvers.js.map