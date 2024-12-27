"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = setup;
const server_1 = require("../server");
const middleware_config_1 = require("../configs/middleware.config");
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const PATH = 'geolocation';
function setup() {
    const API = process.env.IP_API_ENDPOINT;
    server_1.app.get(`/${PATH}/:ip`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const ip = req.params['ip'];
        if (ip !== undefined) {
            const ipApiResponse = yield axios_1.default.get(`${API}${ip}`);
            const parsed = ipApiResponse.data;
            return res.json(parsed.countryCode);
        }
        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    })));
}
//# sourceMappingURL=geolocation.rest.js.map