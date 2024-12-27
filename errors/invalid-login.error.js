"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidLoginError = void 0;
class InvalidLoginError extends Error {
    constructor() {
        super(...arguments);
        this.name = InvalidLoginError.NAME;
        this.message = 'Invalid login.';
    }
}
exports.InvalidLoginError = InvalidLoginError;
InvalidLoginError.NAME = '[InvalidLoginError]';
//# sourceMappingURL=invalid-login.error.js.map