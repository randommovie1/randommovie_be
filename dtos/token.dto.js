"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenDto = void 0;
class TokenDto {
    constructor(object) {
        this.uuid = undefined;
        if (object != null) {
            this.uuid = object.uuid;
        }
    }
}
exports.TokenDto = TokenDto;
//# sourceMappingURL=token.dto.js.map