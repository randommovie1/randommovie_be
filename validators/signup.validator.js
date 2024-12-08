"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const validator_utils_1 = require("../utils/validator.utils");
const string_utils_1 = require("../utils/string.utils");
const validation_error_1 = require("../errors/validation.error");
function validate(dto) {
    if ((0, validator_utils_1.notExists)(dto) ||
        (0, validator_utils_1.notExists)(dto.email) ||
        (0, validator_utils_1.notExists)(dto.password) ||
        (0, validator_utils_1.notExists)(dto.displayName) ||
        (0, string_utils_1.isEmpty)(dto.email) ||
        (0, string_utils_1.isEmpty)(dto.password) ||
        (0, string_utils_1.isEmpty)(dto.displayName) ||
        (0, string_utils_1.isMaxLength)(dto.email, 255) ||
        (0, string_utils_1.isMinMaxLength)(dto.password, 8, 16) ||
        (0, string_utils_1.isMinMaxLength)(dto.displayName, 3, 16) ||
        !(0, string_utils_1.matchesRegex)(dto.email, validator_utils_1.EMAIL_REGEX) ||
        !(0, string_utils_1.matchesRegex)(dto.password, validator_utils_1.PASSWORD_REGEX) ||
        !(0, string_utils_1.matchesRegex)(dto.displayName, validator_utils_1.PASSWORD_REGEX)) {
        throw new validation_error_1.ValidationError();
    }
}
//# sourceMappingURL=signup.validator.js.map