"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
class Login {
    constructor(object) {
        this.email = undefined;
        this.password = undefined;
        if (object != null) {
            this.email = object.email;
            this.password = object.password;
        }
    }
}
exports.Login = Login;
//# sourceMappingURL=login.model.js.map