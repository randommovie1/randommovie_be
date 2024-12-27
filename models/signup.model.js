"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = void 0;
class Signup {
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
exports.Signup = Signup;
//# sourceMappingURL=signup.model.js.map