"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
exports.default = function (content) {
    return crypto.createHmac('sha256', 'secret').update(content).digest('hex');
};
//# sourceMappingURL=createSha.js.map