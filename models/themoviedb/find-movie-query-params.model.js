"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMovieQueryParams = void 0;
class FindMovieQueryParams {
    constructor(object) {
        if (object != null) {
            this.certification = object.certification;
            this['certification.gte'] = object['certification.gte'];
            this['certification.lte'] = object['certification.lte'];
            this.certification_country = object.certification_country;
            this.include_adult = object.include_adult;
            this.include_video = object.include_video;
            this.language = object.language;
            this.page = object.page;
            this.primary_release_year = object.primary_release_year;
            this['primary_release_date.gte'] = object['primary_release_date.gte'];
            this['primary_release_date.lte'] = object['primary_release_date.lte'];
            this.region = object.region;
            this['release_date.gte'] = object['release_date.gte'];
            this['release_date.lte'] = object['release_date.lte'];
            this.sort_by = object.sort_by;
            this['vote_average.gte'] = object['vote_average.gte'];
            this['vote_average.lte'] = object['vote_average.lte'];
            this['vote_count.gte'] = object['vote_count.gte'];
            this['vote_count.lte'] = object['vote_count.lte'];
            this.watch_region = object.watch_region;
            this.with_cast = object.with_cast;
            this.with_companies = object.with_companies;
            this.without_companies = object.without_companies;
            this.with_crew = object.with_crew;
            this.with_genres = object.with_genres;
            this.without_genres = object.without_genres;
            this.with_keywords = object.with_keywords;
            this.without_keywords = object.without_keywords;
            this.with_watch_providers = object.with_watch_providers;
            this.without_watch_providers = object.without_watch_providers;
            this.with_people = object.with_people;
            this.with_origin_country = object.with_origin_country;
            this.with_original_language = object.with_original_language;
            this.with_release_type = object.with_release_type;
            this['with_runtime.gte'] = object['with_runtime.gte'];
            this['with_runtime.lte'] = object['with_runtime.lte'];
            this.with_watch_monetization_types = object.with_watch_monetization_types;
            this.year = object.year;
        }
    }
}
exports.FindMovieQueryParams = FindMovieQueryParams;
//# sourceMappingURL=find-movie-query-params.model.js.map