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
exports.save = save;
exports.getUserById = getUserById;
exports.update = update;
exports.deleteUser = deleteUser;
const UserRepository = __importStar(require("../repositories/user.repository"));
const user_criteria_1 = require("../criterias/user.criteria");
const user_fetch_1 = require("../fetches/user.fetch");
const credential_fetch_1 = require("../fetches/credential.fetch");
const assert_1 = __importDefault(require("assert"));
function save(model) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(model.id == null);
        return yield UserRepository.save(model);
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCriteria = new user_criteria_1.UserCriteria();
        userCriteria.id = id;
        userCriteria.fetch = [
            user_fetch_1.UserForeignKeys.CREDENTIAL,
            credential_fetch_1.CredentialForeignKeys.TOKEN,
        ];
        return yield UserRepository.findSingleByCriteria(userCriteria);
    });
}
function update(model) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(model.id != null);
        return yield UserRepository.update(model);
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCriteria = new user_criteria_1.UserCriteria();
        userCriteria.id = id;
        userCriteria.fetch = [
            user_fetch_1.UserForeignKeys.CREDENTIAL,
            credential_fetch_1.CredentialForeignKeys.TOKEN
        ];
        const user = yield UserRepository.findSingleByCriteria(userCriteria);
        user.deleted = true;
        yield update(user);
    });
}
//# sourceMappingURL=user.service.js.map