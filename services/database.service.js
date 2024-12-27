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
exports.dropAndCreate = dropAndCreate;
exports.doMigrations = doMigrations;
exports._doExecute = _doExecute;
exports.doExecute = doExecute;
exports._doQuery = _doQuery;
exports.doQuery = doQuery;
exports.beginTransaction = beginTransaction;
exports.commit = commit;
exports.rollback = rollback;
exports.release = release;
exports.getConnection = getConnection;
const fs = __importStar(require("node:fs"));
const database_config_1 = require("../configs/database.config");
const sql_cache_shared_1 = require("../shared/sql-cache.shared");
const StringUtils = __importStar(require("../utils/string.utils"));
const boolean_utils_1 = require("../utils/boolean.utils");
const _connection = (0, boolean_utils_1.stringToBoolean)(process.env.DATABASE_ENABLE_DB) ? database_config_1.pool.getConnection() : undefined;
const connection = _connection;
const debug = (0, boolean_utils_1.stringToBoolean)(process.env.DATABASE_QUERY_DEBUG);
function dropAndCreate() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dropDatabase();
        yield createDatabase();
        yield useDatabase();
    });
}
function dropDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield doQuery('DROP DATABASE IF EXISTS `random_movie_db`;', []);
    });
}
function createDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield doQuery('CREATE DATABASE IF NOT EXISTS `random_movie_db`;', []);
    });
}
function useDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield doQuery('USE `random_movie_db`;', []);
    });
}
function doMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = [
            fs.readFileSync('src/database/migrations/0000_init.sql', 'utf8'),
            fs.readFileSync('src/database/migrations/0001_users.sql', 'utf8'),
        ];
        const query = file.reduce((acc, curr) => acc + curr, '');
        return yield doQuery(query, []);
    });
}
function _doExecute(query, values) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection.then(conn => conn.execute(query, values));
    });
}
function doExecute(query_1, values_1) {
    return __awaiter(this, arguments, void 0, function* (query, values, cache = undefined, cacheKey = undefined) {
        if (debug) {
            console.log(query);
        }
        if (cache === true) {
            const hashcode = StringUtils.simpleHash(query);
            const cache = sql_cache_shared_1.SqlCache.getInstance().getCache(cacheKey);
            if (cache == null) {
                return _doExecute(query, values).then(res => {
                    sql_cache_shared_1.SqlCache.getInstance().addCache(cacheKey, hashcode, res);
                    return res;
                });
            }
            else {
                return new Promise(resolve => resolve(cache));
            }
        }
        else {
            return _doExecute(query, values);
        }
    });
}
function _doQuery(query, values) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection.then(conn => conn.query(query, values));
    });
}
function doQuery(query_1, values_1) {
    return __awaiter(this, arguments, void 0, function* (query, values, cache = undefined, cacheKey = undefined) {
        if (debug) {
            console.log(query);
        }
        if (cache === true) {
            const hashcode = StringUtils.simpleHash(query);
            const cache = sql_cache_shared_1.SqlCache.getInstance().getCache(cacheKey);
            if (cache == null) {
                return _doQuery(query, values).then(res => {
                    sql_cache_shared_1.SqlCache.getInstance().addCache(cacheKey, hashcode, res);
                    return res;
                });
            }
            else {
                return new Promise(resolve => resolve(cache));
            }
        }
        else {
            return _doQuery(query, values);
        }
    });
}
function beginTransaction() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection.then(conn => conn.beginTransaction());
    });
}
function commit() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection.then(conn => conn.commit());
    });
}
function rollback() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection.then(conn => conn.rollback());
    });
}
function release() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection.then(conn => conn.release());
    });
}
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection;
    });
}
//# sourceMappingURL=database.service.js.map