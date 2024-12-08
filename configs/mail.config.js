"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const math_utils_1 = require("../utils/math.utils");
const boolean_utils_1 = require("../utils/boolean.utils");
exports.transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: (0, math_utils_1._parseInt)(process.env.SMTP_PORT),
    secure: (0, boolean_utils_1.stringToBoolean)(process.env.SMTP_SECURE),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
exports.mailOptions = {
    from: process.env.SMTP_HOST,
};
//# sourceMappingURL=mail.config.js.map