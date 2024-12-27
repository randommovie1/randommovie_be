"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor() {
        super(...arguments);
        this.name = ValidationError.NAME;
        this.message = 'Validation error.';
    }
}
exports.ValidationError = ValidationError;
ValidationError.NAME = '[ValidationError]';
//# sourceMappingURL=validation.error.js.map