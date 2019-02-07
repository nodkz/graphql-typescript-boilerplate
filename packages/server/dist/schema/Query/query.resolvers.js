"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        hello: function (_, __, context) {
            if (context.user) {
                return "Hi, " + context.user.login + "!!!";
            }
            return "Hello, anon from ip " + context.ip;
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=query.resolvers.js.map