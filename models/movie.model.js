"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(object) {
        this.externalId = undefined;
        this.id = undefined;
        this.originalTitle = undefined;
        this.poster = undefined;
        this.posterPath = undefined;
        this.title = undefined;
        this.watchLater = undefined;
        this.ignored = undefined;
        if (object != null) {
            this.externalId = object.externalId;
            this.id = object.id;
            this.originalTitle = object.originalTitle;
            this.poster = object.poster;
            this.posterPath = object.posterPath;
            this.title = object.title;
            this.watchLater = object.watchLater;
            this.ignored = object.ignored;
        }
    }
    static fromResultSet(rs) {
        return new Movie({
            externalId: rs['external_id'],
            id: rs['id'],
            originalTitle: rs['original_path'],
            posterPath: rs['poster_path'],
            title: rs['title'],
        });
    }
}
exports.Movie = Movie;
//# sourceMappingURL=movie.model.js.map