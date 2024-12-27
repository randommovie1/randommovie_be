"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
const token_model_1 = require("./token.model");
const boolean_utils_1 = require("../utils/boolean.utils");
class Credential {
    constructor(object) {
        this.id = undefined;
        this.email = undefined;
        this.password = undefined;
        this.token = undefined;
        this.enabled = undefined;
        if (object != null) {
            this.id = object.id;
            this.email = object.email;
            this.password = object.password;
            this.token = object.token != null ? new token_model_1.Token(object.token) : undefined;
            this.enabled = (0, boolean_utils_1.numberToBoolean)(object.enabled);
        }
    }
    static fromResultSet(rs) {
        return new Credential({
            id: rs['id'],
            email: rs['email'],
            password: rs['password'],
            token: {
                id: rs['id']
            },
            enabled: rs['enabled']
        });
    }
}
exports.Credential = Credential;
//# sourceMappingURL=credential.model.js.map