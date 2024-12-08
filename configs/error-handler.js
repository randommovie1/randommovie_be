"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const validation_error_1 = require("../errors/validation.error");
const http_status_codes_1 = require("http-status-codes");
const invalid_login_error_1 = require("../errors/invalid-login.error");
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    switch (err.name) {
        case validation_error_1.ValidationError.NAME: {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(err.message);
            break;
        }
        case invalid_login_error_1.InvalidLoginError.NAME: {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send(err.message);
            break;
        }
        default: {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
}
//# sourceMappingURL=error-handler.js.map