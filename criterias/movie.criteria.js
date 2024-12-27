"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieCriteria = void 0;
class MovieCriteria {
    constructor(object) {
        this.id = undefined;
        this.ids = undefined;
        this.externalId = undefined;
        this.title = undefined;
        this.originalTitle = undefined;
        this.backdropPath = undefined;
        this.fetch = undefined;
        if (object != null) {
            this.id = object.id;
            this.ids = object.ids != null ? object.ids.map((i) => i) : undefined;
            this.externalId = object.external_id;
            this.title = object.title;
            this.originalTitle = object.original_title;
            this.backdropPath = object.backdrop_path;
            this.fetch = object.fetch;
        }
    }
}
exports.MovieCriteria = MovieCriteria;
//# sourceMappingURL=movie.criteria.js.map