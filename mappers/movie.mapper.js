"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = toDto;
exports.toModel = toModel;
exports.fromTheMovieDbToMovie = fromTheMovieDbToMovie;
exports.fromTheMovieDbToMovieDto = fromTheMovieDbToMovieDto;
const movie_dto_1 = require("../dtos/movie.dto");
const movie_model_1 = require("../models/movie.model");
function toDto(model) {
    const dto = new movie_dto_1.MovieDto();
    dto.external_id = model.externalId;
    dto.id = model.id;
    dto.original_title = model.originalTitle;
    dto.poster = model.poster;
    dto.poster_path = model.posterPath;
    dto.title = model.title;
    dto.watchLater = model.watchLater;
    return dto;
}
function toModel(dto) {
    const model = new movie_model_1.Movie();
    model.id = dto.id;
    model.poster = dto.poster;
    model.title = dto.title;
    model.watchLater = dto.watchLater;
    return model;
}
function fromTheMovieDbToMovie(model) {
    const entity = new movie_model_1.Movie();
    entity.externalId = model.id;
    entity.originalTitle = model.original_title;
    entity.posterPath = model.poster_path;
    entity.title = model.title;
    return entity;
}
function fromTheMovieDbToMovieDto(model) {
    var _a, _b;
    const dto = new movie_dto_1.MovieDto();
    dto.genres = model.genres != null ? (_a = model.genres) === null || _a === void 0 ? void 0 : _a.map(i => ({ id: i.id, name: i.name })) : undefined;
    dto.external_id = model.id;
    dto.original_title = model.original_title;
    dto.overview = model.overview;
    dto.popularity = model.popularity;
    dto.poster_path = model.poster_path;
    dto.release_date = model.release_date != null ? new Date(model.release_date) : undefined;
    dto.runtime = model.runtime;
    dto.title = model.title;
    dto.vote_average = model.vote_average;
    dto.vote_count = model.vote_count;
    dto.production_countries = model.production_countries != null ? (_b = model.production_countries) === null || _b === void 0 ? void 0 : _b.map(i => ({
        iso_3166_1: i.iso_3166_1,
        name: i.name
    })) : undefined;
    return dto;
}
//# sourceMappingURL=movie.mapper.js.map