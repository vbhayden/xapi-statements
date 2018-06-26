"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./utils/fakeEvents/factory");
var factory_2 = require("./utils/redisEvents/factory");
var factory_3 = require("./utils/sentinel/factory");
exports.default = (function (config) {
    switch (config.facade) {
        case 'test':
            return factory_1.default();
        case 'sentinel':
            return factory_3.default(config.sentinel);
        default:
        case 'redis':
            return factory_2.default(config.redis);
    }
});
//# sourceMappingURL=factory.js.map