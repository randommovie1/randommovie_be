"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
class Video {
    constructor(obj) {
        this.iso_639_1 = undefined;
        this.iso_3166_1 = undefined;
        this.name = undefined;
        this.key = undefined;
        this.site = undefined;
        this.size = undefined;
        this.type = undefined;
        this.official = undefined;
        this.published_at = undefined;
        this.id = undefined;
        if (obj != null) {
            this.iso_639_1 = obj.iso_639_1;
            this.iso_3166_1 = obj.iso_3166_1;
            this.name = obj.name;
            this.key = obj.key;
            this.site = obj.site;
            this.size = obj.size;
            this.type = obj.type;
            this.official = obj.official;
            this.published_at = obj.published_at != null ? new Date(obj.published_at) : undefined;
            this.id = obj.id;
        }
    }
}
exports.Video = Video;
//# sourceMappingURL=video.model.js.map