"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchKeywordResponse = void 0;
const keyword_model_1 = require("./keyword.model");
class SearchKeywordResponse {
    constructor(object) {
        this.page = undefined;
        this.results = [];
        this.total_pages = undefined;
        this.total_results = undefined;
        if (object != null) {
            this.page = object.page;
            this.results = object.results != null ? object.results.map((i) => new keyword_model_1.Keyword(i)) : [];
            this.total_pages = object.total_pages;
            this.total_results = object.total_results;
        }
    }
}
exports.SearchKeywordResponse = SearchKeywordResponse;
//# sourceMappingURL=search-keyword-response.model.js.map