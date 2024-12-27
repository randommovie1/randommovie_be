"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const credential_model_1 = require("./credential.model");
const boolean_utils_1 = require("../utils/boolean.utils");
const movie_model_1 = require("./movie.model");
class User {
    constructor(object) {
        this.id = undefined;
        this.displayName = undefined;
        this.credential = undefined;
        this.insertDatetime = undefined;
        this.deleted = undefined;
        this.moviesToWatchLater = undefined;
        this.ignoredMovies = undefined;
        if (object != null) {
            this.id = object.id;
            this.displayName = object.displayName;
            this.credential = object.credential != null ? new credential_model_1.Credential(object.credential) : undefined;
            this.insertDatetime = object.insertDatetime != null ? new Date(object.insertDatetime) : undefined;
            this.deleted = (0, boolean_utils_1.numberToBoolean)(object.deleted);
            this.moviesToWatchLater = object.moviesToWatchLater != null ? object.moviesToWatchLater.map(((i) => new movie_model_1.Movie(i))) : undefined;
            this.ignoredMovies = object.ignoredMovies != null ? object.ignoredMovies.map(((i) => new movie_model_1.Movie(i))) : undefined;
        }
    }
    static fromResultSet(rs) {
        return new User({
            id: rs['id'],
            displayName: rs['display_name'],
            credential: {
                id: rs['credential_id']
            },
            insertDatetime: rs['insert_datetime'],
            deleted: rs['deleted'],
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map