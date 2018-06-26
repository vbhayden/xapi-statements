"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var fetch_1 = require("../../getClient/fetch");
exports.default = (function (factoryConfig) {
    if (factoryConfig === void 0) { factoryConfig = {}; }
    var facadeConfig = {
        llClientInfoEndpoint: lodash_1.defaultTo(factoryConfig.llClientInfoEndpoint, "http://localhost/auth"),
    };
    return {
        getClient: fetch_1.default(facadeConfig),
    };
});
//# sourceMappingURL=factory.js.map