"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.citySchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.citySchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    population: typebox_1.Type.Optional(typebox_1.Type.Integer()),
}, { additionalProperties: false });
//# sourceMappingURL=city.js.map