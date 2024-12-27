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
exports.findByCriteria = findByCriteria;
exports.findSingleByCriteria = findSingleByCriteria;
exports.findMoviesToWatchLaterByUserId = findMoviesToWatchLaterByUserId;
exports.addMovieToWatchLater = addMovieToWatchLater;
exports.removeMovieFromToWatchLaterByMovieId = removeMovieFromToWatchLaterByMovieId;
exports.removeMovieWatchLaterByUserId = removeMovieWatchLaterByUserId;
exports.findIgnoredMoviesByUserId = findIgnoredMoviesByUserId;
exports.addMovieToIgnore = addMovieToIgnore;
exports.removeMovieToIgnoreByMovieId = removeMovieToIgnoreByMovieId;
exports.removeMovieIgnoreByUserId = removeMovieIgnoreByUserId;
const db = __importStar(require("../services/database.service"));
const movie_model_1 = require("../models/movie.model");
const resource_not_found_error_1 = require("../errors/resource-not-found.error");
const movie_fetch_1 = require("../fetches/movie.fetch");
const sql_cache_shared_1 = require("../shared/sql-cache.shared");
function save(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO `random_movie_db`.`movies`' +
            ' (   ' +
            '    `external_id`,' +
            '    `title`,' +
            '    `original_title`,' +
            '    `poster_path`' +
            ' )' +
            ' VALUES (?,?,?,?);';
        const result = yield db.doExecute(query, [model.externalId, model.title, model.originalTitle, model.posterPath]);
        model.id = result[0].insertId;
        return model;
    });
}
function findByCriteria(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT * FROM \`random_movie_db\`.\`movies\` movie' +
            ' WHERE 1=1';
        if (criteria.id != null) {
            query += ` AND movie.id = ${criteria.id}`;
        }
        if (criteria.ids != null) {
            query += ` AND movie.id in (${criteria.ids.length > 0 ? criteria.ids.join(',') : 'NULL'})`;
        }
        if (criteria.externalId != null) {
            query += ` AND movie.external_id = ${criteria.externalId}`;
        }
        if (criteria.title != null) {
            query += ` AND movie.title = '${criteria.title}'`;
        }
        if (criteria.originalTitle != null) {
            query += ` AND movie.original_title = '${criteria.originalTitle}'`;
        }
        if (criteria.backdropPath != null) {
            query += ` AND movie.backdrop_path = '${criteria.backdropPath}'`;
        }
        query += ';';
        const queryResult = yield db.doExecute(query, []);
        return Promise.all(queryResult[0].map((res) => __awaiter(this, void 0, void 0, function* () {
            let model = movie_model_1.Movie.fromResultSet(res);
            if (criteria.fetch != null) {
                model = yield new movie_fetch_1.MovieFetch().handle(criteria.fetch, model);
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
function findMoviesToWatchLaterByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT movie_id FROM \`random_movie_db\`.\`user_movies_to_watch_later\`' +
            ' WHERE user_id = ?;';
        const result = yield db.doExecute(query, [userId], true, sql_cache_shared_1.SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);
        return result[0].reduce((acc, curr) => {
            acc.push(curr['movie_id']);
            return acc;
        }, []);
    });
}
function addMovieToWatchLater(userId, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO \`random_movie_db\`.\`user_movies_to_watch_later\`' +
            ' (' +
            '    `user_id`,' +
            '    `movie_id`' +
            ' )' +
            ' VALUES (?, ?);';
        sql_cache_shared_1.SqlCache.getInstance().clearCache(sql_cache_shared_1.SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);
        yield db.doExecute(query, [userId, movieId]);
    });
}
function removeMovieFromToWatchLaterByMovieId(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'DELETE FROM \`random_movie_db\`.\`user_movies_to_watch_later\`' +
            ' WHERE movie_id = ?';
        sql_cache_shared_1.SqlCache.getInstance().clearCache(sql_cache_shared_1.SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);
        yield db.doExecute(query, [movieId]);
    });
}
function removeMovieWatchLaterByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'DELETE FROM \`random_movie_db\`.\`user_movies_to_watch_later\`' +
            ' WHERE user_id = ?';
        sql_cache_shared_1.SqlCache.getInstance().clearCache(sql_cache_shared_1.SqlCacheKey.USER_MOVIES_TO_WATCH_LATER);
        yield db.doExecute(query, [userId]);
    });
}
function findIgnoredMoviesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT movie_id FROM \`random_movie_db\`.\`user_ignored_movies\`' +
            ' WHERE user_id = ?;';
        const result = yield db.doExecute(query, [userId], true, sql_cache_shared_1.SqlCacheKey.USER_IGNORED_MOVIES);
        return result[0].reduce((acc, curr) => {
            acc.push(curr['movie_id']);
            return acc;
        }, []);
    });
}
function addMovieToIgnore(userId, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO \`random_movie_db\`.\`user_ignored_movies\`' +
            ' (' +
            '    `user_id`,' +
            '    `movie_id`' +
            ' )' +
            ' VALUES (?, ?);';
        sql_cache_shared_1.SqlCache.getInstance().clearCache(sql_cache_shared_1.SqlCacheKey.USER_IGNORED_MOVIES);
        yield db.doExecute(query, [userId, movieId]);
    });
}
function removeMovieToIgnoreByMovieId(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'DELETE FROM \`random_movie_db\`.\`user_ignored_movies\`' +
            ' WHERE movie_id = ?';
        sql_cache_shared_1.SqlCache.getInstance().clearCache(sql_cache_shared_1.SqlCacheKey.USER_IGNORED_MOVIES);
        yield db.doExecute(query, [movieId]);
    });
}
function removeMovieIgnoreByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'DELETE FROM \`random_movie_db\`.\`user_ignored_movies\`' +
            ' WHERE user_id = ?';
        sql_cache_shared_1.SqlCache.getInstance().clearCache(sql_cache_shared_1.SqlCacheKey.USER_IGNORED_MOVIES);
        yield db.doExecute(query, [userId]);
    });
}
//# sourceMappingURL=movie.repository.js.map