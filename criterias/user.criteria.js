"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCriteria = void 0;
class UserCriteria {
    constructor(object) {
        this.id = undefined;
        this.displayName = undefined;
        this.credentialId = undefined;
        this.fetch = undefined;
        if (object != null) {
            this.id = object.id;
            this.displayName = object.displayName;
            this.credentialId = object.credentialId;
            this.fetch = object.fetch;
        }
    }
}
exports.UserCriteria = UserCriteria;
//# sourceMappingURL=user.criteria.js.map