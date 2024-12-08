"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMovieProvidersResponse = void 0;
class GetMovieProvidersResponse {
    constructor(object) {
        this.id = undefined;
        this.results = undefined;
        if (object != null) {
            this.id = object.id;
            this.results = object.results;
        }
    }
}
exports.GetMovieProvidersResponse = GetMovieProvidersResponse;
//# sourceMappingURL=get-movie-providers-response.model.js.map