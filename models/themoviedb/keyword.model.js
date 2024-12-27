"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyword = void 0;
class Keyword {
    constructor(object) {
        this.id = undefined;
        this.name = undefined;
        if (object != null) {
            this.id = object.id;
            this.name = object.name;
        }
    }
}
exports.Keyword = Keyword;
//# sourceMappingURL=keyword.model.js.map