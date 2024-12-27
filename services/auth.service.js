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
exports.authFilter = exports.genToken = void 0;
exports.login = login;
exports.signup = signup;
exports.resetPassword = resetPassword;
exports.checkEmail = checkEmail;
exports.checkUsername = checkUsername;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_crypto_1 = require("node:crypto");
const TokenService = __importStar(require("../services/token.service"));
const CredentialRepository = __importStar(require("../repositories/credential.repository"));
const UserRepository = __importStar(require("../repositories/user.repository"));
const CredentialService = __importStar(require("../services/credential.service"));
const UserService = __importStar(require("../services/user.service"));
const user_model_1 = require("../models/user.model");
const token_model_1 = require("../models/token.model");
const credential_model_1 = require("../models/credential.model");
const credential_criteria_1 = require("../criterias/credential.criteria");
const assert_1 = __importDefault(require("assert"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const invalid_login_error_1 = require("../errors/invalid-login.error");
const user_criteria_1 = require("../criterias/user.criteria");
const user_fetch_1 = require("../fetches/user.fetch");
const DatabaseService = __importStar(require("../services/database.service"));
const resource_not_found_error_1 = require("../errors/resource-not-found.error");
const current_session_shared_1 = require("../shared/current-session.shared");
const secretKey = 'Xukveo=y#!#GUi8';
const genToken = (payload) => jsonwebtoken_1.default.sign(payload, secretKey);
exports.genToken = genToken;
const authFilter = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader == null) {
        res.sendStatus(401);
        return;
    }
    const token = authHeader.split(' ')[1];
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err != null) {
            res.sendStatus(403);
            return;
        }
        const _session = req.session;
        _session.userId = decoded.userId;
        current_session_shared_1.CurrentSession.getInstance().session = _session;
        next();
    });
};
exports.authFilter = authFilter;
function login(model, req) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(model.email);
        assert_1.default.ok(model.password);
        const credentialCriteria = new credential_criteria_1.CredentialCriteria();
        credentialCriteria.email = model.email;
        let credential = undefined;
        try {
            credential = yield CredentialRepository.findSingleByCriteria(credentialCriteria);
        }
        catch (e) {
            throw new invalid_login_error_1.InvalidLoginError();
        }
        if (credential.password == null) {
            throw new Error();
        }
        const userCriteria = new user_criteria_1.UserCriteria();
        userCriteria.credentialId = credential.id;
        const user = yield UserRepository.findSingleByCriteria(userCriteria);
        if (user.deleted === true ||
            credential.enabled === false ||
            !(yield bcrypt_1.default.compare(model.password, credential.password))) {
            throw new invalid_login_error_1.InvalidLoginError();
        }
        return (0, exports.genToken)({ userId: user.id, email: model.email });
    });
}
function signup(model) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(model.password);
        try {
            yield DatabaseService.beginTransaction();
            const token = new token_model_1.Token();
            token.uuid = (0, node_crypto_1.randomUUID)();
            yield TokenService.save(token);
            const credential = new credential_model_1.Credential();
            credential.email = model.email;
            credential.password = yield bcrypt_1.default.hash(model.password, 10);
            credential.token = token;
            yield CredentialService.save(credential);
            const user = new user_model_1.User();
            user.displayName = model.displayName;
            user.credential = credential;
            yield UserService.save(user);
            yield DatabaseService.commit();
            return user;
        }
        catch (e) {
            yield DatabaseService.rollback();
            throw e;
        }
        finally {
            yield DatabaseService.release();
        }
    });
}
function resetPassword(userId, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCriteria = new user_criteria_1.UserCriteria();
        userCriteria.id = userId;
        userCriteria.fetch = [user_fetch_1.UserForeignKeys.CREDENTIAL];
        const user = yield UserRepository.findSingleByCriteria(userCriteria);
        assert_1.default.ok(user.credential);
        user.credential.password = yield bcrypt_1.default.hash(password, 10);
        yield CredentialService.update(user.credential);
    });
}
function checkEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialCriteria = new credential_criteria_1.CredentialCriteria();
        credentialCriteria.email = email;
        try {
            yield CredentialRepository.findSingleByCriteria(credentialCriteria);
        }
        catch (e) {
            if (e.name === resource_not_found_error_1.ResourceNotFoundError.NAME) {
                return true;
            }
            else {
                throw e;
            }
        }
        return false;
    });
}
function checkUsername(displayName) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCriteria = new user_criteria_1.UserCriteria();
        userCriteria.displayName = displayName;
        try {
            yield UserRepository.findSingleByCriteria(userCriteria);
        }
        catch (e) {
            if (e.name === resource_not_found_error_1.ResourceNotFoundError.NAME) {
                return true;
            }
            else {
                throw e;
            }
        }
        return false;
    });
}
//# sourceMappingURL=auth.service.js.map