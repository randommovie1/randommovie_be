"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMoviesResponse = void 0;
const the_movie_db_movie_model_1 = require("./the-movie-db-movie.model");
class FindMoviesResponse {
    constructor(object) {
        this.page = undefined;
        this.results = [];
        if (object != null) {
            this.page = object.page;
            this.results = object.results != null ? object.results.map((i) => new the_movie_db_movie_model_1.TheMovieDbMovie(i)) : [];
            this.total_pages = object.total_pages;
            this.total_results = object.total_results;
        }
    }
}
exports.FindMoviesResponse = FindMoviesResponse;
//# sourceMappingURL=find-movie-response.model.js.map