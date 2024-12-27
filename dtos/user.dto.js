"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const credential_dto_1 = require("./credential.dto");
const movie_dto_1 = require("./movie.dto");
class UserDto {
    constructor(object) {
        this.id = undefined;
        this.displayName = undefined;
        this.credential = undefined;
        this.moviesToWatchLater = undefined;
        this.ignoredMovies = undefined;
        if (object != null) {
            this.id = object.id;
            this.displayName = object.displayName;
            this.credential = object.credential != null ? new credential_dto_1.CredentialDto(object.credential) : undefined;
            this.moviesToWatchLater = object.moviesToWatchLater != null ? object.moviesToWatchLater.map(((i) => new movie_dto_1.MovieDto(i))) : undefined;
            this.ignoredMovies = object.ignoredMovies != null ? object.ignoredMovies.map(((i) => new movie_dto_1.MovieDto(i))) : undefined;
        }
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map