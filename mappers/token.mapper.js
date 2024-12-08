"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = toDto;
exports.toModel = toModel;
const token_model_1 = require("../models/token.model");
const token_dto_1 = require("../dtos/token.dto");
function toDto(model) {
    const dto = new token_dto_1.TokenDto();
    dto.uuid = model.uuid;
    return dto;
}
function toModel(dto) {
    const model = new token_model_1.Token();
    model.uuid = dto.uuid;
    return model;
}
//# sourceMappingURL=token.mapper.js.map