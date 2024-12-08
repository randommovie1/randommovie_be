"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialCriteria = void 0;
class CredentialCriteria {
    constructor(object) {
        this.id = undefined;
        this.email = undefined;
        this.password = undefined;
        this.tokenId = undefined;
        this.enabled = undefined;
        this.fetch = undefined;
        if (object != null) {
            this.id = object.id;
            this.email = object.email;
            this.password = object.password;
            this.tokenId = object.tokenId;
            this.enabled = object.enabled;
            this.fetch = object.fetch;
        }
    }
}
exports.CredentialCriteria = CredentialCriteria;
//# sourceMappingURL=credential.criteria.js.map