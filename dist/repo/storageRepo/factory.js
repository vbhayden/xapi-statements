"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./utils/googleStorage/factory");
var factory_2 = require("./utils/localStorage/factory");
var factory_3 = require("./utils/s3Storage/factory");
exports.default = (function (config) {
    switch (config.facade) {
        case 's3':
            return factory_3.default(config.s3);
        case 'google':
            return factory_1.default(config.google);
        case 'local':
        default:
            return factory_2.default(config.local);
    }
});
//# sourceMappingURL=factory.js.map