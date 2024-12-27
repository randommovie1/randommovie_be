"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = toDto;
exports.toModel = toModel;
const user_model_1 = require("../models/user.model");
const user_dto_1 = require("../dtos/user.dto");
const CredentialMapper = __importStar(require("./credential.mapper"));
const MovieMapper = __importStar(require("./movie.mapper"));
function toDto(model) {
    const dto = new user_dto_1.UserDto();
    dto.id = model.id;
    dto.displayName = model.displayName;
    dto.credential = model.credential != null ? CredentialMapper.toDto(model.credential) : undefined;
    dto.moviesToWatchLater = model.moviesToWatchLater != null ? model.moviesToWatchLater.map(i => MovieMapper.toDto(i)) : undefined;
    dto.ignoredMovies = model.ignoredMovies != null ? model.ignoredMovies.map(i => MovieMapper.toDto(i)) : undefined;
    return dto;
}
function toModel(dto) {
    const model = new user_model_1.User();
    model.id = dto.id;
    model.displayName = dto.displayName;
    model.credential = dto.credential != null ? CredentialMapper.toModel(dto.credential) : undefined;
    model.moviesToWatchLater = dto.moviesToWatchLater != null ? dto.moviesToWatchLater.map(i => MovieMapper.toModel(i)) : undefined;
    model.ignoredMovies = dto.ignoredMovies != null ? dto.ignoredMovies.map(i => MovieMapper.toModel(i)) : undefined;
    return model;
}
//# sourceMappingURL=user.mapper.js.map