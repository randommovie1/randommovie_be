"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupDto = void 0;
class SignupDto {
    constructor(object) {
        this.email = undefined;
        this.password = undefined;
        this.displayName = undefined;
        if (object != null) {
            this.email = object.email;
            this.password = object.password;
            this.displayName = object.displayName;
        }
    }
}
exports.SignupDto = SignupDto;
//# sourceMappingURL=signup.dto.js.map