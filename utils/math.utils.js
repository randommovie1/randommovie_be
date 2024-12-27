"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = getRandomNumber;
exports._parseInt = _parseInt;
/**
 * Random number [0, n-1]
 * @param n
 */
function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}
function _parseInt(value) {
    if (value === undefined) {
        return undefined;
    }
    return parseInt(value);
}
//# sourceMappingURL=math.utils.js.map