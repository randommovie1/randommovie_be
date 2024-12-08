"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDto = toDto;
exports.toModel = toModel;
const credential_dto_1 = require("../dtos/credential.dto");
const credential_model_1 = require("../models/credential.model");
function toDto(model) {
    const dto = new credential_dto_1.CredentialDto();
    dto.email = model.email;
    return dto;
}
function toModel(dto) {
    const model = new credential_model_1.Credential();
    model.email = dto.email;
    return model;
}
//# sourceMappingURL=credential.mapper.js.map