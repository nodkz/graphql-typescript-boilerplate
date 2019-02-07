"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Mutation: {
        time: function () { return new Date().toDateString(); },
    },
};
exports.default = resolvers;
//# sourceMappingURL=mutation.resolvers.js.map