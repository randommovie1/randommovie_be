"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_REGEX = exports.EMAIL_REGEX = void 0;
exports.exists = exists;
exports.notExists = notExists;
exports.EMAIL_REGEX = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
exports.PASSWORD_REGEX = new RegExp('^[a-zA-Z0-9!@#$%^&*()_+=.-]+$');
/**
 * Checks if a given value is neither `null` nor `undefined`.
 *
 * @param obj - The value to be checked.
 * @returns `true` if the value is not `null` and not `undefined`; otherwise, `false`.
 *
 * @example
 * ```typescript
 * exists(null); // returns false
 * exists(undefined); // returns false
 * exists(0); // returns true
 * exists(""); // returns true
 * exists({}); // returns true
 * ```
 */
function exists(obj) {
    return obj != null;
}
/**
 * Checks if a given value is either `null` or `undefined`.
 *
 * @param obj - The value to be checked.
 * @returns `true` if the value is `null` or `undefined`; otherwise, `false`.
 *
 * @example
 * ```typescript
 * notExists(null); // returns true
 * notExists(undefined); // returns true
 * notExists(0); // returns false
 * notExists(""); // returns false
 * notExists({}); // returns false
 * ```
 */
function notExists(obj) {
    return obj == null;
}
//# sourceMappingURL=validator.utils.js.map