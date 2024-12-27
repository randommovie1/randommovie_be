"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
exports.interceptor = interceptor;
const current_session_shared_1 = require("../shared/current-session.shared");
function asyncHandler(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
function interceptor(req, res, next) {
    const currentSession = current_session_shared_1.CurrentSession.getInstance();
    if (currentSession.session === undefined) {
        currentSession.session = req.session;
    }
    const country = req.headers['country'];
    if (country !== undefined) {
        currentSession.session.country = country;
    }
    else {
        currentSession.session.country = undefined;
    }
    if (req.method !== 'OPTIONS') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
}
//# sourceMappingURL=middleware.config.js.map