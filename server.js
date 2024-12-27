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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db = __importStar(require("./services/database.service"));
const boolean_utils_1 = require("./utils/boolean.utils");
const SessionConfig = __importStar(require("./configs/session.config"));
const CorsConfig = __importStar(require("./configs/cors.config"));
const AxiosConfig = __importStar(require("./configs/axios.config"));
const AuthRest = __importStar(require("./rest/auth.rest"));
const CredentialRest = __importStar(require("./rest/credential.rest"));
const KeywordRest = __importStar(require("./rest/keyword.rest"));
const MovieRest = __importStar(require("./rest/movie.rest"));
const PersonRest = __importStar(require("./rest/person.rest"));
const PosterRest = __importStar(require("./rest/poster.rest"));
const TokenRest = __importStar(require("./rest/token.rest"));
const UserRest = __importStar(require("./rest/user.rest"));
const UtilsRest = __importStar(require("./rest/utils.rest"));
const Geolocation = __importStar(require("./rest/geolocation.rest"));
const math_utils_1 = require("./utils/math.utils");
const assert_1 = __importDefault(require("assert"));
const error_handler_1 = require("./configs/error-handler");
const middleware_config_1 = require("./configs/middleware.config");
exports.app = (0, express_1.default)();
dotenv_1.default.config();
console.log(`Running on ${process.env.ENVIRONMENT} env`);
exports.app.set('env', process.env.ENVIRONMENT);
const port = (0, math_utils_1._parseInt)(process.env.PORT);
assert_1.default.ok(port);
exports.app.use(express_1.default.json());
// CONFIG
AxiosConfig.config();
SessionConfig.config();
CorsConfig.config();
// END CONFIG
// before rest
exports.app.use(middleware_config_1.interceptor);
// REST - Need to be after SessionConfig.config();
AuthRest.setup();
CredentialRest.setup();
KeywordRest.setup();
MovieRest.setup();
PersonRest.setup();
PosterRest.setup();
TokenRest.setup();
UserRest.setup();
UtilsRest.setup();
Geolocation.setup();
// END REST
// After rest config
exports.app.use(error_handler_1.errorHandler);
// DATABASE
if ((0, boolean_utils_1.stringToBoolean)(process.env.DATABASE_ENABLE_DB) &&
    (0, boolean_utils_1.stringToBoolean)(process.env.DATABASE_DROP)) {
    db.dropAndCreate().then(() => db.doMigrations());
}
// END DATABASE
// MailService.sendTestEmail();
if (exports.app.get('env') === 'prod') {
    exports.app.enable('trust proxy');
}
exports.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map