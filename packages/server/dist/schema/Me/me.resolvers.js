"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        me: function (_, __, _a) {
            var user = _a.user;
            if (user)
                return {};
            return null;
        },
    },
    Me: {
        user: function (_, __, _a) {
            var user = _a.user;
            return user;
        },
        userData: function (_, __, _a) {
            var hasRole = _a.hasRole;
            if (!hasRole('user'))
                return null;
            return 'Some info for role USER';
        },
        adminData: function (_, __, _a) {
            var hasRole = _a.hasRole;
            if (!hasRole('admin'))
                return null;
            return 'Some info for role ADMIN';
        },
    },
};
exports.default = resolvers;
//# sourceMappingURL=me.resolvers.js.map