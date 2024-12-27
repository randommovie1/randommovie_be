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
exports.findSingleByCriteria = findSingleByCriteria;
exports.findByCriteria = findByCriteria;
exports.getUserMoviesToWatchLater = getUserMoviesToWatchLater;
exports.save = save;
exports.addMovieToWatchLater = addMovieToWatchLater;
exports.removeMovieFromToWatchLaterByMovieId = removeMovieFromToWatchLaterByMovieId;
exports.removeMovieWatchLaterByUserId = removeMovieWatchLaterByUserId;
exports.getUserIgnoredMovies = getUserIgnoredMovies;
exports.addMovieToIgnore = addMovieToIgnore;
exports.removeMovieToIgnore = removeMovieToIgnore;
exports.removeMovieToIgnoreByUserId = removeMovieToIgnoreByUserId;
const assert_1 = __importDefault(require("assert"));
const MovieRepository = __importStar(require("../repositories/movie.repository"));
const movie_criteria_1 = require("../criterias/movie.criteria");
const TheMovieDbService = __importStar(require("../services/the-movie-db.service"));
const resource_not_found_error_1 = require("../errors/resource-not-found.error");
const movie_fetch_1 = require("../fetches/movie.fetch");
const movie_mapper_1 = require("../mappers/movie.mapper");
function findSingleByCriteria(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield MovieRepository.findSingleByCriteria(criteria);
    });
}
function findByCriteria(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield MovieRepository.findByCriteria(criteria);
    });
}
function getUserMoviesToWatchLater(userId_1) {
    return __awaiter(this, arguments, void 0, function* (userId, fetchPoster = false) {
        const criteria = new movie_criteria_1.MovieCriteria();
        criteria.ids = [...yield findAllMoviesToWatchLaterByUserId(userId)];
        if (fetchPoster) {
            criteria.fetch = [movie_fetch_1.MovieForeignKeys.POSTER];
        }
        return yield MovieRepository.findByCriteria(criteria);
    });
}
function findAllMoviesToWatchLaterByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(userId);
        return yield MovieRepository.findMoviesToWatchLaterByUserId(userId);
    });
}
function save(model) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(model.id == null);
        return yield MovieRepository.save(model);
    });
}
function addMovieToWatchLater(userId, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const movieCriteria = new movie_criteria_1.MovieCriteria();
        movieCriteria.externalId = movieId;
        let movie = undefined;
        try {
            movie = yield findSingleByCriteria(movieCriteria);
        }
        catch (e) {
            if (e.name === resource_not_found_error_1.ResourceNotFoundError.NAME) {
                const extMovie = yield TheMovieDbService.getMovieDetails(movieId);
                movie = yield save((0, movie_mapper_1.fromTheMovieDbToMovie)(extMovie));
            }
            else {
                throw e;
            }
        }
        assert_1.default.ok(movie != null && movie.id != null);
        yield MovieRepository.addMovieToWatchLater(userId, movie.id);
    });
}
function removeMovieFromToWatchLaterByMovieId(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(movieId);
        yield MovieRepository.removeMovieFromToWatchLaterByMovieId(movieId);
    });
}
function removeMovieWatchLaterByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(userId);
        yield MovieRepository.removeMovieWatchLaterByUserId(userId);
    });
}
function getUserIgnoredMovies(userId_1) {
    return __awaiter(this, arguments, void 0, function* (userId, fetchPoster = false) {
        const criteria = new movie_criteria_1.MovieCriteria();
        criteria.ids = [...yield findAllIgnoredMoviesByUserId(userId)];
        if (fetchPoster) {
            criteria.fetch = [movie_fetch_1.MovieForeignKeys.POSTER];
        }
        return yield MovieRepository.findByCriteria(criteria);
    });
}
function findAllIgnoredMoviesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(userId);
        return yield MovieRepository.findIgnoredMoviesByUserId(userId);
    });
}
function addMovieToIgnore(userId, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(userId);
        assert_1.default.ok(movieId);
        const movieCriteria = new movie_criteria_1.MovieCriteria();
        movieCriteria.externalId = movieId;
        let movie = undefined;
        try {
            movie = yield findSingleByCriteria(movieCriteria);
        }
        catch (e) {
            if (e.name === resource_not_found_error_1.ResourceNotFoundError.NAME) {
                const extMovie = yield TheMovieDbService.getMovieDetails(movieId);
                movie = yield save((0, movie_mapper_1.fromTheMovieDbToMovie)(extMovie));
            }
            else {
                throw e;
            }
        }
        assert_1.default.ok(movie != null && movie.id != null);
        yield MovieRepository.addMovieToIgnore(userId, movie.id);
    });
}
function removeMovieToIgnore(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(movieId);
        return yield MovieRepository.removeMovieToIgnoreByMovieId(movieId);
    });
}
function removeMovieToIgnoreByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(userId);
        return yield MovieRepository.removeMovieIgnoreByUserId(userId);
    });
}
//# sourceMappingURL=movie.service.js.map