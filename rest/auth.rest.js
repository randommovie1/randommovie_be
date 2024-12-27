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
const signup_dto_1 = require("../dtos/signup.dto");
const AuthService = __importStar(require("../services/auth.service"));
const LoginMapper = __importStar(require("../mappers/login.mapper"));
const SignupMapper = __importStar(require("../mappers/signup.mapper"));
const UserMapper = __importStar(require("../mappers/user.mapper"));
const login_dto_1 = require("../dtos/login.dto");
const SignupValidator = __importStar(require("../validators/signup.validator"));
const LoginValidator = __importStar(require("../validators/login.validator"));
const string_utils_1 = require("../utils/string.utils");
const auth_service_1 = require("../services/auth.service");
const assert_1 = __importDefault(require("assert"));
const middleware_config_1 = require("../configs/middleware.config");
const http_status_codes_1 = require("http-status-codes");
const PATH = 'auth';
function setup() {
    /** For testing purpose */
    server_1.app.get(`/${PATH}/protected`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        res.json('You have access to this protected route!');
    })));
    server_1.app.post(`/${PATH}/login`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const login = new login_dto_1.LoginDto(req.body);
        LoginValidator.validate(login);
        const token = yield AuthService.login(LoginMapper.toModel(login), req);
        res.send(token);
    })));
    server_1.app.post(`/${PATH}/logout`, (req, res) => {
        req.session.destroy(err => {
            if (err != null) {
                return res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
            res.sendStatus(http_status_codes_1.StatusCodes.OK);
        });
    });
    server_1.app.post(`/${PATH}/signup`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const signup = new signup_dto_1.SignupDto(req.body);
        signup.displayName = (0, string_utils_1.normalizeWhitespace)(signup.displayName);
        SignupValidator.validate(signup);
        const user = yield AuthService.signup(SignupMapper.toModel(signup));
        res.json(UserMapper.toDto(user));
    })));
    server_1.app.post(`/${PATH}/reset-password`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = req.session.userId;
        assert_1.default.ok(userId);
        yield AuthService.resetPassword(userId, req.body.password);
        res.send();
    })));
    server_1.app.get(`/${PATH}/check-email/:email`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const email = req.params['email'];
        assert_1.default.ok(email);
        res.send(yield AuthService.checkEmail(email));
    })));
    server_1.app.get(`/${PATH}/check-username/:username`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const username = req.params['username'];
        assert_1.default.ok(username);
        res.send(yield AuthService.checkUsername(username));
    })));
}
//# sourceMappingURL=auth.rest.js.map