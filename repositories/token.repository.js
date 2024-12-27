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
const token_model_1 = require("../models/token.model");
const db = __importStar(require("../services/database.service"));
const resource_not_found_error_1 = require("../errors/resource-not-found.error");
function save(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO `random_movie_db`.`tokens`' +
            ' (' +
            '    `uuid`' +
            ' )' +
            ' VALUES (?);';
        const result = yield db.doExecute(query, [model.uuid]);
        model.id = result[0].insertId;
        return model;
    });
}
function update(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'UPDATE `random_movie_db`.`tokens`' +
            ' SET' +
            ' consumed = ?,' +
            ' consumed_datetime = ?' +
            ' WHERE id = ?';
        const result = yield db.doExecute(query, [model.consumed, model.consumedDatetime, model.id]);
        return model;
    });
}
function findByCriteria(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * from \`random_movie_db\`.\`tokens\` tok' +
            ' WHERE 1=1';
        if (criteria.id != null) {
            query += ` AND tok.id = ${criteria.id}`;
        }
        if (criteria.uuid != null) {
            query += ` AND tok.uuid = '${criteria.uuid}'`;
        }
        if (criteria.consumed != null) {
            query += ` AND tok.consumed = ${criteria.consumed}`;
        }
        query += ';';
        const queryResult = yield db.doExecute(query, []);
        return queryResult[0].map(res => token_model_1.Token.fromResultSet(res));
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
//# sourceMappingURL=token.repository.js.map