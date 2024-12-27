"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
class ResourceNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = ResourceNotFoundError.NAME;
        this.message = 'Resource not found.';
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
ResourceNotFoundError.NAME = '[ResourceNotFoundError]';
//# sourceMappingURL=resource-not-found.error.js.map