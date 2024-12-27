"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
class Person {
    constructor(object) {
        this.id = undefined;
        this.name = undefined;
        this.known_for_department = undefined;
        this.popularity = undefined;
        this.character = undefined;
        this.profile_path = undefined;
        this.job = undefined;
        if (object != null) {
            this.id = object.id;
            this.name = object.name;
            this.known_for_department = object.known_for_department;
            this.popularity = object.popularity;
            this.character = object.character;
            this.profile_path = object.profile_path;
            this.job = object.job;
        }
    }
}
exports.Person = Person;
//# sourceMappingURL=person.model.js.map