"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = toDto;
exports.toModel = toModel;
const signup_dto_1 = require("../dtos/signup.dto");
const signup_model_1 = require("../models/signup.model");
function toDto(model) {
    const dto = new signup_dto_1.SignupDto();
    dto.email = model.email;
    dto.password = model.password;
    dto.displayName = model.displayName;
    return dto;
}
function toModel(dto) {
    const model = new signup_model_1.Signup();
    model.email = dto.email;
    model.password = dto.password;
    model.displayName = dto.displayName;
    return model;
}
//# sourceMappingURL=signup.mapper.js.map