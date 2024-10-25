"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = generateApiKey;
const crypto_1 = require("crypto");
function generateApiKey(length = 32) {
    const bytes = (0, crypto_1.randomBytes)(length);
    const apiKey = bytes.toString('hex').slice(0, length);
    return apiKey;
}
//# sourceMappingURL=Api_key_generate.js.map