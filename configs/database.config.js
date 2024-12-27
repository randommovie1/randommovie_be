"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const math_utils_1 = require("../utils/math.utils");
const boolean_utils_1 = require("../utils/boolean.utils");
let pool = undefined;
exports.pool = pool;
if ((0, boolean_utils_1.stringToBoolean)(process.env.DATABASE_ENABLE_DB)) {
    exports.pool = pool = promise_1.default.createPool({
        host: process.env.DATABASE_HOST,
        port: (0, math_utils_1._parseInt)(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        multipleStatements: true,
    });
}
//# sourceMappingURL=database.config.js.map