"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function preparePageInfo(page, perPage, totalItems) {
    var totalPages = Math.ceil(totalItems / perPage);
    return {
        totalPages: totalPages,
        totalItems: totalItems,
        page: page,
        perPage: perPage,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
}
exports.preparePageInfo = preparePageInfo;
//# sourceMappingURL=helpers.js.map