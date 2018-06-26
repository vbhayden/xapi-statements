"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var lodash_1 = require("lodash");
exports.default = (function (req) { return lodash_1.defaultTo(url_1.parse(req.originalUrl).pathname, '/'); });
//# sourceMappingURL=getUrlPath.js.map