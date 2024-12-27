"use strict";
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
exports.getMovieProviders = getMovieProviders;
exports.finMoviesByQueryParams = finMoviesByQueryParams;
exports.doSearchPerson = doSearchPerson;
exports.getMovieCredits = getMovieCredits;
exports.getMovieDetails = getMovieDetails;
exports.doSearchKeywords = doSearchKeywords;
exports.getMovieVideos = getMovieVideos;
exports.getMoviePoster = getMoviePoster;
const get_movie_credits_response_model_1 = require("../models/themoviedb/get-movie-credits-response.model");
const search_person_response_model_1 = require("../models/themoviedb/search-person-response.model");
const the_movie_db_movie_model_1 = require("../models/themoviedb/the-movie-db-movie.model");
const search_keyword_response_model_1 = require("../models/themoviedb/search-keyword-response.model");
const find_movie_response_model_1 = require("../models/themoviedb/find-movie-response.model");
const get_movie_providers_response_model_1 = require("../models/themoviedb/get-movie-providers-response.model");
const axios_1 = __importDefault(require("axios"));
const assert_1 = __importDefault(require("assert"));
const current_session_shared_1 = require("../shared/current-session.shared");
const location_utils_1 = require("../utils/location.utils");
const get_movie_videos_response_model_1 = require("../models/themoviedb/get-movie-videos-response.model");
const AUTH = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTQwZTczZTBmYjBjM2Y4NDM2NTliZTVkYzgwOGIyOSIsIm5iZiI6MTcyMjg3NDQwNS4zNzEyMiwic3ViIjoiNjZiMGY4N2VmY2QwMTlkODk5ZjQ4ZmYxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ALVzLp8MT3l9TkMZhgy0J9E2BWqyDh1Wb-7B0hgzhqY';
/** max page themovedb can accept */
const MAX_ITERATE_PAGES = 10;
function getMovieProviders(id) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(id);
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
            params: {
                language: 'it-IT'
            },
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'accept': 'application/json'
            }
        });
        return new get_movie_providers_response_model_1.GetMovieProvidersResponse(response.data);
    });
}
function finMoviesByQueryParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/discover/movie', {
            params: params,
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Accept': 'application/json'
            }
        });
        return new find_movie_response_model_1.FindMoviesResponse(response.data);
    });
}
function doSearchPerson(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const persons = [];
        let page = 1;
        const response = yield doSearchPersonByPage(name, page);
        persons.push(...response.results);
        assert_1.default.ok(response.total_pages);
        if (response.total_pages > 1) {
            while (page < MAX_ITERATE_PAGES) {
                if (page > response.total_pages) {
                    break;
                }
                page++;
                persons.push(...((yield doSearchPersonByPage(name, page)).results));
            }
        }
        return persons;
    });
}
function doSearchPersonByPage(name, page) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(name);
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/search/person', {
            params: {
                query: name,
                page: page,
                language: 'it-IT'
            },
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Accept': 'application/json'
            }
        });
        return new search_person_response_model_1.SearchPersonResponse(response.data);
    });
}
function getMovieCredits(id) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(id);
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: {
                language: 'it-IT'
            },
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Accept': 'application/json'
            }
        });
        return new get_movie_credits_response_model_1.GetMovieCreditsResponse(response.data);
    });
}
function getMovieDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(id);
        const sessionCountry = current_session_shared_1.CurrentSession.getInstance().country;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                language: (0, location_utils_1.getLanguageFromCountryCode)(sessionCountry)
            },
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Accept': 'application/json'
            }
        });
        return new the_movie_db_movie_model_1.TheMovieDbMovie(response.data);
    });
}
function doSearchKeywords(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const keywords = [];
        let page = 1;
        const response = yield doSearchKeywordsByPage(name, page);
        keywords.push(...response.results);
        assert_1.default.ok(response.total_pages);
        if (response.total_pages > 1) {
            while (page < MAX_ITERATE_PAGES) {
                if (page > response.total_pages) {
                    break;
                }
                page++;
                keywords.push(...((yield doSearchKeywordsByPage(name, page)).results));
            }
        }
        return keywords;
    });
}
function doSearchKeywordsByPage(name, page) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(name);
        const sessionCountry = current_session_shared_1.CurrentSession.getInstance().country;
        const response = yield axios_1.default.get('https://api.themoviedb.org/3/search/keyword', {
            params: {
                query: name,
                page: page,
                language: (0, location_utils_1.getLanguageFromCountryCode)(sessionCountry)
            },
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Accept': 'application/json'
            }
        });
        return new search_keyword_response_model_1.SearchKeywordResponse(response.data);
    });
}
function getMovieVideos(id, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.default.ok(id);
        const sessionCountry = current_session_shared_1.CurrentSession.getInstance().country;
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            params: {
                language: lang !== null && lang !== void 0 ? lang : (0, location_utils_1.getLanguageFromCountryCode)(sessionCountry)
            },
            headers: {
                'Authorization': 'Bearer ' + AUTH,
                'Accept': 'application/json'
            }
        });
        return new get_movie_videos_response_model_1.GetMovieVideosResponse(response.data);
    });
}
function getMoviePoster(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${path}`, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'image/*'
            }
        });
        return Buffer.from(response.data, 'binary').toString('base64');
    });
}
//# sourceMappingURL=the-movie-db.service.js.map