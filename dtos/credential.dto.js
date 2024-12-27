"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialDto = void 0;
class CredentialDto {
    constructor(object) {
        this.email = undefined;
        if (object != null) {
            this.email = object.email;
        }
    }
}
exports.CredentialDto = CredentialDto;
//# sourceMappingURL=credential.dto.js.map