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
exports.UserFetch = exports.UserForeignKeys = void 0;
const CredentialRepository = __importStar(require("../repositories/credential.repository"));
const credential_criteria_1 = require("../criterias/credential.criteria");
const MovieService = __importStar(require("../services/movie.service"));
const assert_1 = __importDefault(require("assert"));
var UserForeignKeys;
(function (UserForeignKeys) {
    UserForeignKeys["CREDENTIAL"] = "user.credential";
    UserForeignKeys["MOVIES_TO_WATCH_LATER"] = "user.movies_to_watch_later";
    UserForeignKeys["IGNORED_MOVIES"] = "user.ignored_movie";
})(UserForeignKeys || (exports.UserForeignKeys = UserForeignKeys = {}));
class UserFetch {
    constructor() {
    }
    handle(keys, model) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (keys.includes(UserForeignKeys.CREDENTIAL)) {
                const credentialCriteria = new credential_criteria_1.CredentialCriteria();
                credentialCriteria.id = (_a = model.credential) === null || _a === void 0 ? void 0 : _a.id;
                credentialCriteria.fetch = keys;
                model.credential = yield CredentialRepository.findSingleByCriteria(credentialCriteria);
            }
            if (keys.includes(UserForeignKeys.MOVIES_TO_WATCH_LATER)) {
                assert_1.default.ok(model.id);
                model.moviesToWatchLater = yield MovieService.getUserMoviesToWatchLater(model.id);
            }
            if (keys.includes(UserForeignKeys.IGNORED_MOVIES)) {
                assert_1.default.ok(model.id);
                model.ignoredMovies = yield MovieService.getUserIgnoredMovies(model.id);
            }
            return model;
        });
    }
}
exports.UserFetch = UserFetch;
//# sourceMappingURL=user.fetch.js.map