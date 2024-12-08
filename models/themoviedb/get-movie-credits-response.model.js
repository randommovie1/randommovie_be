"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMovieCreditsResponse = void 0;
const person_model_1 = require("../person.model");
class GetMovieCreditsResponse {
    constructor(object) {
        this.id = undefined;
        this.cast = [];
        this.crew = [];
        if (object != null) {
            this.id = object.id;
            this.cast = object.cast != null ? object.cast.map((i) => new person_model_1.Person(i)) : [];
            this.crew = object.crew != null ? object.crew.map((i) => new person_model_1.Person(i)) : [];
        }
    }
}
exports.GetMovieCreditsResponse = GetMovieCreditsResponse;
//# sourceMappingURL=get-movie-credits-response.model.js.map