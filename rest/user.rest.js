"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const UserService = __importStar(require("../services/user.service"));
const UserMapper = __importStar(require("../mappers/user.mapper"));
const auth_service_1 = require("../services/auth.service");
const assert_1 = __importDefault(require("assert"));
const middleware_config_1 = require("../configs/middleware.config");
const http_status_codes_1 = require("http-status-codes");
const PATH = 'user';
function setup() {
    server_1.app.get(`/${PATH}`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const _session = req.session;
        assert_1.default.ok(_session.userId);
        const user = yield UserService.getUserById(_session.userId);
        res.json(UserMapper.toDto(user));
    })));
    server_1.app.get(`/${PATH}/:id`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const user = yield UserService.getUserById(parseInt(req.params['id']));
        res.json(UserMapper.toDto(user));
    })));
    server_1.app.delete(`/${PATH}`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(req.session.userId);
        yield UserService.deleteUser(req.session.userId);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    })));
}
//# sourceMappingURL=user.rest.js.map