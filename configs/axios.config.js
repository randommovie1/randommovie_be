"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = config;
const axios_1 = __importDefault(require("axios"));
function config() {
    axios_1.default.interceptors.request.use(request => {
        // console.log('Starting Request', JSON.stringify(request, null, 2))
        return request;
    });
}
//# sourceMappingURL=axios.config.js.map