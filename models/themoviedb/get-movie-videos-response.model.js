"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMovieVideosResponse = void 0;
const video_model_1 = require("./video.model");
class GetMovieVideosResponse {
    constructor(obj) {
        this.id = undefined;
        this.results = undefined;
        if (obj != null) {
            this.id = obj.id;
            this.results = obj.results != null ? obj.results.map((i) => new video_model_1.Video(i)) : undefined;
        }
    }
}
exports.GetMovieVideosResponse = GetMovieVideosResponse;
//# sourceMappingURL=get-movie-videos-response.model.js.map