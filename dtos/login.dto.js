"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
class LoginDto {
    constructor(object) {
        this.email = undefined;
        this.password = undefined;
        if (object != null) {
            this.email = object.email;
            this.password = object.password;
        }
    }
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map