"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./utils/memoryModels/factory");
var factory_2 = require("./utils/mongoModels/factory");
exports.default = (function (config) {
    switch (config.facade) {
        case 'mongo':
            return factory_2.default(config.mongo);
        default:
        case 'memory':
            return factory_1.default(config.memory);
    }
});
//# sourceMappingURL=factory.js.map