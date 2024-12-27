"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = toDto;
exports.toModel = toModel;
const login_model_1 = require("../models/login.model");
const login_dto_1 = require("../dtos/login.dto");
function toDto(model) {
    const dto = new login_dto_1.LoginDto();
    dto.email = model.email;
    dto.password = model.password;
    return dto;
}
function toModel(dto) {
    const model = new login_model_1.Login();
    model.email = dto.email;
    model.password = dto.password;
    return model;
}
//# sourceMappingURL=login.mapper.js.map