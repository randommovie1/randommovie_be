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
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = save;
exports.update = update;
exports.findByCriteria = findByCriteria;
exports.findSingleByCriteria = findSingleByCriteria;
const credential_model_1 = require("../models/credential.model");
const db = __importStar(require("../services/database.service"));
const credential_fetch_1 = require("../fetches/credential.fetch");
const resource_not_found_error_1 = require("../errors/resource-not-found.error");
function save(model) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const query = 'INSERT INTO \`random_movie_db\`.\`credentials\`' +
            ' (' +
            '    `email`,' +
            '    `password`,' +
            '    `token_id`' +
            ' )' +
            ' VALUES (?, ?, ?);';
        const result = yield db.doExecute(query, [model.email, model.password, (_a = model.token) === null || _a === void 0 ? void 0 : _a.id]);
        model.id = result[0].insertId;
        return model;
    });
}
function update(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'UPDATE `random_movie_db`.`credentials`' +
            ' SET ' +
            ' `email` = ?,' +
            ' `password` = ?,' +
            ' `enabled` = ?' +
            ' WHERE `id` = ?;';
        yield db.doExecute(query, [model.email, model.password, , model.enabled, model.id]);
        return model;
    });
}
function findByCriteria(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * from \`random_movie_db\`.\`credentials\` cred' +
            ' WHERE 1=1';
        if (criteria.id != null) {
            query += ` AND cred.id = ${criteria.id}`;
        }
        if (criteria.email != null) {
            query += ` AND cred.email = '${criteria.email}'`;
        }
        // if (criteria.password != null) {
        //     query += ` AND cred.password = '${criteria.password}'`;
        // }
        if (criteria.tokenId != null) {
            query += ` AND cred.token_id = ${criteria.tokenId}`;
        }
        if (criteria.enabled != null) {
            query += ` AND cred.enabled = ${criteria.enabled}`;
        }
        query += ';';
        const queryResult = yield db.doExecute(query, []);
        return Promise.all(queryResult[0].map((res) => __awaiter(this, void 0, void 0, function* () {
            let model = credential_model_1.Credential.fromResultSet(res);
            if (criteria.fetch != null) {
                model = yield new credential_fetch_1.CredentialFetch().handle(criteria.fetch, model);
            }
            return model;
        })));
    });
}
function findSingleByCriteria(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield findByCriteria(criteria).then(res => res[0]);
        if (result == undefined) {
            throw new resource_not_found_error_1.ResourceNotFoundError();
        }
        return result;
    });
}
//# sourceMappingURL=credential.repository.js.map