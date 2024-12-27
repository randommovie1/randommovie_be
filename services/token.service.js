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
exports.consumeToken = consumeToken;
const TokenRepository = __importStar(require("../repositories/token.repository"));
const CredentialRepository = __importStar(require("../repositories/credential.repository"));
const token_criteria_1 = require("../criterias/token.criteria");
const credential_criteria_1 = require("../criterias/credential.criteria");
const assert_1 = __importDefault(require("assert"));
const DatabaseService = __importStar(require("./database.service"));
function save(model) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield TokenRepository.save(model);
    });
}
function consumeToken(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenCriteria = new token_criteria_1.TokenCriteria();
        tokenCriteria.uuid = uuid;
        const token = yield TokenRepository.findSingleByCriteria(tokenCriteria);
        assert_1.default.ok(token.consumed === false);
        token.consumed = true;
        token.consumedDatetime = new Date();
        const credentialCriteria = new credential_criteria_1.CredentialCriteria();
        credentialCriteria.tokenId = token.id;
        const credential = yield CredentialRepository.findSingleByCriteria(credentialCriteria);
        credential.enabled = true;
        try {
            yield DatabaseService.beginTransaction();
            yield TokenRepository.update(token);
            yield CredentialRepository.update(credential);
            yield DatabaseService.commit();
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
//# sourceMappingURL=token.service.js.map