"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
exports.interceptor = interceptor;
function asyncHandler(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
function interceptor(req, res, next) {
    if (req.method !== 'OPTIONS') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
}
//# sourceMappingURL=middleware.config.js.map