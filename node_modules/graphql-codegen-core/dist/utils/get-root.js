"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoot = function (schema, operation) {
    switch (operation.operation) {
        case 'query':
            return schema.getQueryType();
        case 'mutation':
            return schema.getMutationType();
        case 'subscription':
            return schema.getSubscriptionType();
        default:
            return null;
    }
};
//# sourceMappingURL=get-root.js.map