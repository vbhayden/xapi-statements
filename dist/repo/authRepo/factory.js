"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./utils/fakeAuth/factory");
var factory_2 = require("./utils/fetchAuth/factory");
var factory_3 = require("./utils/mongoAuth/factory");
exports.default = (function (config) {
    switch (config.facade) {
        case 'test':
            return factory_1.default(config.fake);
        case 'fetch':
            return factory_2.default(config.fetch);
        default:
        case 'mongo':
            return factory_3.default(config.mongo);
    }
});
//# sourceMappingURL=factory.js.map