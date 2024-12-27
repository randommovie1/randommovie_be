"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDto = void 0;
class MovieDto {
    constructor(object) {
        this.external_id = undefined;
        this.genres = undefined;
        this.id = undefined;
        this.original_title = undefined;
        this.overview = undefined;
        this.popularity = undefined;
        this.poster = undefined;
        this.poster_path = undefined;
        this.release_date = undefined;
        this.runtime = undefined;
        this.title = undefined;
        this.vote_average = undefined;
        this.vote_count = undefined;
        this.watchLater = undefined;
        this.production_countries = undefined;
        if (object != null) {
            this.external_id = object.external_id;
            this.genres = object.genres != null ? object.genres.map((i) => ({
                id: i.id,
                name: i.name,
            })) : undefined;
            this.id = object.id;
            this.original_title = object.original_title;
            this.overview = object.overview;
            this.popularity = object.popularity;
            this.poster = object.poster_path;
            this.poster_path = object.poster_path;
            this.release_date = object.release_date != null ? new Date(object.release_date) : undefined;
            this.runtime = object.runtime;
            this.title = object.title;
            this.vote_average = object.vote_average;
            this.vote_count = object.vote_count;
            this.watchLater = object.watchLater;
            this.production_countries = object.production_countries != null ? object.production_countries.map((i) => ({
                iso_3166_1: i.iso_3166_1,
                name: i.name,
            })) : undefined;
        }
    }
}
exports.MovieDto = MovieDto;
//# sourceMappingURL=movie.dto.js.map