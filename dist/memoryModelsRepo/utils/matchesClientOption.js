"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var scopes = require("../../utils/scopes");
var READ_ALL_SCOPES = [
    scopes.ALL,
    scopes.ALL_READ,
    scopes.XAPI_ALL,
    scopes.XAPI_READ,
    scopes.XAPI_STATEMENTS_READ,
];
exports.default = function (model, client) {
    return (model.lrs_id === client.lrs_id &&
        (lodash_1.intersection(READ_ALL_SCOPES, client.scopes).length > 0 ||
            (lodash_1.includes(client.scopes, scopes.XAPI_STATEMENTS_READ_MINE) &&
                model.client === client._id)));
};
//# sourceMappingURL=matchesClientOption.js.map