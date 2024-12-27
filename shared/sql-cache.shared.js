"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlCache = exports.SqlCacheKey = void 0;
const current_session_shared_1 = require("./current-session.shared");
const assert_1 = __importDefault(require("assert"));
var SqlCacheKey;
(function (SqlCacheKey) {
    SqlCacheKey["USER_MOVIES_TO_WATCH_LATER"] = "userMoviesToWatchLater";
    SqlCacheKey["USER_IGNORED_MOVIES"] = "userIgnoredMovies";
})(SqlCacheKey || (exports.SqlCacheKey = SqlCacheKey = {}));
class SqlCache {
    constructor() {
        this.cache = new Map();
    }
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new SqlCache();
        }
        return this.instance;
    }
    addCache(key, hashcode, payload) {
        const keyMap = this.generateKey(key);
        if (!this.cache.has(keyMap)) {
            this.cache.set(keyMap, { hashcode, payload });
        }
        else {
            const _payload = this.cache.get(keyMap);
            if (hashcode !== (_payload === null || _payload === void 0 ? void 0 : _payload.hashcode)) {
                this.cache.delete(keyMap);
                this.cache.set(keyMap, { hashcode, payload });
            }
        }
    }
    getCache(key) {
        var _a;
        return (_a = this.cache.get(this.generateKey(key))) === null || _a === void 0 ? void 0 : _a.payload;
    }
    clearCache(key) {
        this.cache.delete(this.generateKey(key));
    }
    generateKey(key) {
        const userId = current_session_shared_1.CurrentSession.getInstance().getUserId();
        assert_1.default.ok(userId);
        return `${userId}-${key}`;
    }
}
exports.SqlCache = SqlCache;
SqlCache.instance = undefined;
//# sourceMappingURL=sql-cache.shared.js.map