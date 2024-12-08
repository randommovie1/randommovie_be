"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCriteria = void 0;
class TokenCriteria {
    constructor(object) {
        this.id = undefined;
        this.uuid = undefined;
        this.consumed = undefined;
        if (object != null) {
            this.id = object.id;
            this.uuid = object.uuid;
            this.consumed = object.consumed;
        }
    }
}
exports.TokenCriteria = TokenCriteria;
//# sourceMappingURL=token.criteria.js.map