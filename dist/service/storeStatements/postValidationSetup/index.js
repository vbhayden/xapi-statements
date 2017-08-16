"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_hash_1 = require("object-hash");
var setupObjectTypes_1 = require("./setupObjectTypes");
var setupPreHashStatement_1 = require("./setupPreHashStatement");
var setupPostHashStatement_1 = require("./setupPostHashStatement");
exports.default = function (models, client) {
    var storedTime = new Date();
    var storedTimeString = storedTime.toISOString();
    return models.map(function (model) {
        var objectTypesModel = setupObjectTypes_1.default(model);
        var preHashStatement = setupPreHashStatement_1.default(objectTypesModel, client.authority);
        var postHashStatement = setupPostHashStatement_1.default(preHashStatement, storedTimeString);
        var timestampTime = new Date(postHashStatement.timestamp);
        return {
            hasGeneratedId: model.id === undefined,
            organisation: client.organisation,
            lrs_id: client.lrs_id,
            client: client._id,
            person: null,
            active: true,
            voided: false,
            timestamp: timestampTime,
            stored: storedTime,
            refs: [],
            hash: object_hash_1.sha1(preHashStatement),
            statement: postHashStatement,
        };
    });
};
//# sourceMappingURL=index.js.map