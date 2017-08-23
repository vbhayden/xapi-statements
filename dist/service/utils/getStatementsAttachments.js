"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var removeDuplicates_1 = require("../../utils/removeDuplicates");
var getStatementBaseAttachments = function (statement) {
    var attachments = statement.attachments;
    if (attachments === undefined)
        return [];
    return attachments;
};
exports.default = function (models) {
    var attachments = models.reduce(function (results, model) {
        var statementAttachments = getStatementBaseAttachments(model.statement);
        var subStatementAttachments = (model.statement.object.objectType === 'SubStatement'
            ? getStatementBaseAttachments(model.statement.object)
            : []);
        return results.concat(statementAttachments, subStatementAttachments);
    }, []);
    var uniqueAttachments = removeDuplicates_1.default(attachments, function (attachment) {
        return attachment.sha2;
    });
    return uniqueAttachments;
};
//# sourceMappingURL=getStatementsAttachments.js.map