"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSettings = "Warning: No value set for this environment variable";
const config = {
    PORT: process.env.PORT || missingSettings,
};
exports.default = config;
//# sourceMappingURL=config.js.map