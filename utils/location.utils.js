"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageFromCountryCode = getLanguageFromCountryCode;
const country_locale_map_1 = __importDefault(require("country-locale-map"));
/**
 * Returns the language associated with a given country code.
 *
 * This function uses the `CountryLocale.getLocaleByAlpha2` method to fetch the locale
 * for the specified country code. If a valid locale is found, it returns the language
 * in a standardized format with the underscore (`_`) replaced by a hyphen (`-`).
 * If no locale is found or the country code is invalid, it defaults to `'en-US'`.
 *
 * @param {string} countryCode - A two-letter country code (ISO 3166-1 alpha-2) representing the country.
 * @returns {string} - A language code in the format `language-region`, or `'en-US'` if no language is found.
 *
 * @example
 * getLanguageFromCountryCode('US'); // Returns: 'en-US'
 * getLanguageFromCountryCode('IT'); // Returns: 'it-IT'
 * getLanguageFromCountryCode('ZZ'); // Returns: 'en-US' (default)
 */
function getLanguageFromCountryCode(countryCode) {
    var _a;
    let language = country_locale_map_1.default.getLocaleByAlpha2(countryCode);
    return (_a = language === null || language === void 0 ? void 0 : language.replace('_', '-')) !== null && _a !== void 0 ? _a : 'en-US';
}
//# sourceMappingURL=location.utils.js.map