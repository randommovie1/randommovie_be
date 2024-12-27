"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPersonResponse = void 0;
const person_model_1 = require("../person.model");
class SearchPersonResponse {
    constructor(object) {
        this.page = undefined;
        this.results = [];
        this.total_pages = undefined;
        this.total_results = undefined;
        if (object != null) {
            this.page = object.page;
            this.results = object.results != null ? object.results.map((i) => new person_model_1.Person(i)) : [];
            this.total_pages = object.total_pages;
            this.total_results = object.total_results;
        }
    }
}
exports.SearchPersonResponse = SearchPersonResponse;
//# sourceMappingURL=search-person-response.model.js.map