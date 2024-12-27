"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = config;
const express_session_1 = __importDefault(require("express-session"));
const node_crypto_1 = require("node:crypto");
const assert_1 = __importDefault(require("assert"));
const server_1 = require("../server");
function config() {
    const opts = {
        genid(req) {
            return (0, node_crypto_1.randomUUID)();
        },
        secret: 'mrkn1M36(4*%51b',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: server_1.app.get('env') === 'prod' ? 'none' : 'lax',
        }
    };
    if (server_1.app.get('env') === 'prod') {
        assert_1.default.ok(opts.cookie);
        /** If you have your node.js behind a proxy and are using secure: true, you need to set “trust proxy” in express */
        // app.set('trust proxy', 1);
        /** To accept only https request */
        opts.cookie.secure = true;
    }
    server_1.app.use((0, express_session_1.default)(opts));
}
//# sourceMappingURL=session.config.js.map