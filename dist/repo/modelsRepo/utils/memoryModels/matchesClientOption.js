"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var scopes = require("../../../../utils/scopes");
var READ_ALL_SCOPES = [
    scopes.ALL,
    scopes.ALL_READ,
    scopes.XAPI_ALL,
    scopes.XAPI_READ,
    scopes.XAPI_STATEMENTS_READ,
];
exports.default = (function (model, client, enableReadMine) {
    if (enableReadMine === void 0) { enableReadMine = false; }
    var canOnlyReadMine = (enableReadMine &&
        lodash_1.intersection(READ_ALL_SCOPES, client.scopes).length === 0 &&
        lodash_1.includes(client.scopes, scopes.XAPI_STATEMENTS_READ_MINE));
    return (model.organisation === client.organisation &&
        model.lrs_id === client.lrs_id &&
        (canOnlyReadMine ? model.client === client._id : true));
});
//# sourceMappingURL=matchesClientOption.js.map