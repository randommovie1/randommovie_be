"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheMovieDbMovie = void 0;
class TheMovieDbMovie {
    constructor(object) {
        var _a;
        this.adult = undefined;
        this.backdrop_path = undefined;
        this.genres = undefined;
        this.id = undefined;
        this.origin_country = undefined;
        this.original_title = undefined;
        this.overview = undefined;
        this.popularity = undefined;
        this.poster_path = undefined;
        this.release_date = undefined;
        this.runtime = undefined;
        this.title = undefined;
        this.video = undefined;
        this.vote_average = undefined;
        this.vote_count = undefined;
        this.production_countries = undefined;
        if (object != null) {
            this.adult = object.adult;
            this.backdrop_path = object.backdrop_path;
            this.genres = object.genres != null ? object.genres.map((i) => ({
                id: i.id,
                name: i.name,
            })) : undefined;
            this.id = object.id;
            this.origin_country = (_a = object.origin_country) !== null && _a !== void 0 ? _a : undefined;
            this.original_title = object.original_title;
            this.overview = object.overview;
            this.popularity = object.popularity;
            this.poster_path = object.poster_path;
            this.release_date = object.release_date != null ? new Date(object.release_date) : undefined;
            this.runtime = object.runtime;
            this.title = object.title;
            this.video = object.video;
            this.vote_average = object.vote_average;
            this.vote_count = object.vote_count;
            this.production_countries = object.production_countries != null ? object.production_countries.map((i) => ({
                iso_3166_1: i.iso_3166_1,
                name: i.name
            })) : undefined;
        }
    }
}
exports.TheMovieDbMovie = TheMovieDbMovie;
//# sourceMappingURL=the-movie-db-movie.model.js.map