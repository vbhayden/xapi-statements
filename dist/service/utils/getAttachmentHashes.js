"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getStatementBaseAttachments = function (statement) {
    var attachments = statement.attachments;
    if (attachments === undefined)
        return [];
    var storedAttachments = attachments.filter(function (attachment) {
        return attachment.fileUrl === undefined;
    }).map(function (attachment) {
        return _a = {}, _a[attachment.sha2] = attachment, _a;
        var _a;
    });
    return storedAttachments;
};
exports.default = function (models) {
    var attachmentMaps = models.reduce(function (maps, model) {
        var statementAttachments = getStatementBaseAttachments(model.statement);
        var subStatementAttachments = (model.statement.object.objectType === 'SubStatement'
            ? getStatementBaseAttachments(model.statement.object)
            : []);
        return maps.concat(statementAttachments, subStatementAttachments);
    }, []);
    return Object.assign.apply(Object, [{}].concat(attachmentMaps));
};
//# sourceMappingURL=getAttachmentHashes.js.map