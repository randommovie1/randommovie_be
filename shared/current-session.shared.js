"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSession = void 0;
class CurrentSession {
    constructor() {
        this._session = undefined;
    }
    static getCurrentSession() {
        if (this.instance == null) {
            this.instance = new CurrentSession();
        }
        return this.instance;
    }
    getUserId() {
        var _a;
        return (_a = this.session) === null || _a === void 0 ? void 0 : _a.userId;
    }
    set session(session) {
        this._session = session;
    }
    get session() {
        return this._session;
    }
}
exports.CurrentSession = CurrentSession;
CurrentSession.instance = undefined;
//# sourceMappingURL=current-session.shared.js.map