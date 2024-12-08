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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const find_movie_query_params_model_1 = require("../models/themoviedb/find-movie-query-params.model");
const math_utils_1 = require("../utils/math.utils");
const assert_1 = __importDefault(require("assert"));
const server_1 = require("../server");
const TheMovieDbService = __importStar(require("../services/the-movie-db.service"));
const middleware_config_1 = require("../configs/middleware.config");
const auth_service_1 = require("../services/auth.service");
const http_status_codes_1 = require("http-status-codes");
const MovieService = __importStar(require("../services/movie.service"));
const movie_mapper_1 = require("../mappers/movie.mapper");
const current_session_shared_1 = require("../shared/current-session.shared");
const movie_service_1 = require("../services/movie.service");
const PATH = 'movie';
const MAX_PAGE = 500;
function setup() {
    server_1.app.get(`/${PATH}`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        // console.log(req.sessionID);
        let session = current_session_shared_1.CurrentSession.getCurrentSession().session;
        if (session == null) {
            session = req.session;
        }
        const queryParams = new find_movie_query_params_model_1.FindMovieQueryParams(req.query);
        queryParams.language = 'it-IT';
        if (session.queryParams === undefined) {
            session.queryParams = new find_movie_query_params_model_1.FindMovieQueryParams(queryParams);
            session.totalPages = 1;
        }
        if (JSON.stringify(queryParams) !== JSON.stringify(session.queryParams)) {
            session.totalPages = 1;
            session.queryParams = new find_movie_query_params_model_1.FindMovieQueryParams(queryParams);
        }
        if (session.totalPages != null) {
            queryParams.page = (0, math_utils_1.getRandomNumber)(session.totalPages) + 1;
        }
        assert_1.default.ok(queryParams.page);
        if (queryParams.page > MAX_PAGE) {
            queryParams.page = (0, math_utils_1.getRandomNumber)(MAX_PAGE) + 1;
        }
        const response = yield TheMovieDbService.finMoviesByQueryParams(queryParams);
        (0, assert_1.default)(response.total_results != undefined);
        let movie = null;
        if (response.total_results > 0) {
            session.totalPages = response.total_pages;
            const userId = current_session_shared_1.CurrentSession.getCurrentSession().getUserId();
            if (userId != null) {
                const ignoredMovieIds = yield (0, movie_service_1.getUserIgnoredMovies)(userId)
                    .then(res => res.map(i => i.externalId));
                const _try = 5;
                let i = 0;
                let ignored = true;
                let extMovie = undefined;
                while (i < _try && ignored) {
                    extMovie = response.results[(0, math_utils_1.getRandomNumber)(response.results.length)];
                    ignored = ignoredMovieIds.includes(extMovie.id);
                    i++;
                }
                if (!ignored) {
                    movie = (0, movie_mapper_1.fromTheMovieDbToMovieDto)(yield TheMovieDbService.getMovieDetails(extMovie.id));
                    const sessionUserId = current_session_shared_1.CurrentSession.getCurrentSession().getUserId();
                    if (sessionUserId != null) {
                        const toWatchLater = yield (0, movie_service_1.getUserMoviesToWatchLater)(current_session_shared_1.CurrentSession.getCurrentSession().getUserId());
                        movie.watchLater = toWatchLater.map(i => i.externalId).includes(extMovie.id);
                    }
                }
            }
            else {
                const extMovie = response.results[(0, math_utils_1.getRandomNumber)(response.results.length)];
                movie = (0, movie_mapper_1.fromTheMovieDbToMovieDto)(yield TheMovieDbService.getMovieDetails(extMovie.id));
            }
        }
        res.json(movie);
    })));
    server_1.app.get(`/${PATH}/mock`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        res.json({
            "external_id": 306,
            "genres": [
                {
                    "id": 28,
                    "name": "Azione"
                },
                {
                    "id": 35,
                    "name": "Commedia"
                },
                {
                    "id": 80,
                    "name": "Crime"
                }
            ],
            "original_title": "Beverly Hills Cop III",
            "overview": "Il detective Axel Foley stà indagando su un traffico di macchine rubate quando scopre qualcosa di molto molto grosso.",
            "popularity": 41.405,
            "poster_path": "/cOPMgeww6hdlg09vcTYGh0FjbJD.jpg",
            "release_date": "1994-05-24T00:00:00.000Z",
            "runtime": 105,
            "title": "Beverly Hills Cop III - Un piedipiatti a Beverly Hills III",
            "vote_average": 5.9,
            "vote_count": 1845,
            "watchLater": false
        });
    })));
    server_1.app.get(`/${PATH}/:movieId/providers`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const movieId = parseInt(req.params['movieId']);
        const response = yield TheMovieDbService.getMovieProviders(movieId);
        res.json(((_a = response.results) === null || _a === void 0 ? void 0 : _a['IT']) || null);
    })));
    server_1.app.get(`/${PATH}/:movieId/credits`, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.params['movieId']);
        const response = yield TheMovieDbService.getMovieCredits(movieId);
        res.json(response);
    })));
    server_1.app.get(`/${PATH}/watch-later`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movies = yield MovieService.getUserMoviesToWatchLater(req.session.userId, true);
        res.json(movies.map(i => (0, movie_mapper_1.toDto)(i)));
    })));
    server_1.app.put(`/${PATH}/watch-later`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.query.id);
        const userId = req.session.userId;
        assert_1.default.ok(userId);
        yield MovieService.addMovieToWatchLater(userId, movieId);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    })));
    server_1.app.delete(`/${PATH}/watch-later`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.query.id);
        yield MovieService.removeMovieFromToWatchLaterByMovieId(movieId);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    })));
    server_1.app.get(`/${PATH}/ignore`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movies = yield MovieService.getUserIgnoredMovies(req.session.userId, true);
        res.json(movies.map(i => (0, movie_mapper_1.toDto)(i)));
    })));
    server_1.app.put(`/${PATH}/ignore`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.query.id);
        const userId = req.session.userId;
        assert_1.default.ok(userId);
        yield MovieService.addMovieToIgnore(userId, movieId);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    })));
    server_1.app.delete(`/${PATH}/ignore`, auth_service_1.authFilter, (0, middleware_config_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.query.id);
        yield MovieService.removeMovieToIgnore(movieId);
        res.sendStatus(http_status_codes_1.StatusCodes.OK);
    })));
}
//# sourceMappingURL=movie.rest.js.map