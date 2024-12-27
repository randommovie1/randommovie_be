"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const boolean_utils_1 = require("../utils/boolean.utils");
class Token {
    constructor(object) {
        this.id = undefined;
        this.uuid = undefined;
        this.insertDatetime = undefined;
        this.consumed = undefined;
        this.consumedDatetime = undefined;
        if (object != null) {
            this.id = object.id;
            this.uuid = object.uuid;
            this.insertDatetime = object.insertDatetime != null ? new Date(object.insertDatetime) : undefined;
            this.consumed = (0, boolean_utils_1.numberToBoolean)(object.consumed);
            this.consumedDatetime = object.consumedDatetime != null ? new Date(object.consumedDatetime) : undefined;
        }
    }
    static fromResultSet(rs) {
        return new Token({
            id: rs['id'],
            uuid: rs['uuid'],
            insertDatetime: rs['insertDatetime'],
            consumed: rs['consumed'],
            consumedDatetime: rs['consumedDatetime']
        });
    }
}
exports.Token = Token;
//# sourceMappingURL=token.model.js.map